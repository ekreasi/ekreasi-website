import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Config } from '../../config';
import { AuditTrail } from './../../audit-trail';
import { Title } from '@angular/platform-browser';
import { CacheService } from '../../cache.service';
import { forEach } from '@angular/router/src/utils/collection';
import * as CryptoJS from 'crypto-js';
import { chart } from 'highcharts';
import * as Highcharts from 'highcharts';
Highcharts.setOptions({ lang: { thousandsSep: ',' } });

@Component({
  selector: 'performance-fund-monthly-1',
  templateUrl: './fund-monthly.component.html',
  styleUrls: ['./fund-monthly.component.scss'],
  providers: [Config, AuditTrail]
})

export class FundMonthlyComponent implements OnInit {
  params: any;
  fundNameData: any = [];
  monthlyData: any = [];
  monthlyPricingDateData: any = [];
  monthlyBidPriceData: any = [];
  chartDataMonthly: any = [];
  currency: string = '';
  attoken: string = '';

  yearOption: any = [];
  monthOption: any = [];
  projectName: string = 'fund';
  modelFundName: any = '';
  modelYear: any = '';
  modelMonth: any = '';

  public loadingData: boolean = false;
  public userId: any = '';

  constructor(private route: ActivatedRoute,
    private cnf: Config,
    private auditTrail: AuditTrail,
    private titleService: Title,
    private http: HttpClient,
    private cacheService: CacheService,
    private translate: TranslateService
  ) {
    this.route.params.subscribe(params => this.params = params);
  }

  decryptData(encryptData) {
    let decodeString = atob(encryptData);

    let key = CryptoJS.enc.Utf8.parse(this.cnf.encryptKey);
    let decrypted = CryptoJS.AES.decrypt(decodeString, key,
      {
        keySize: 128 / 8,
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
      }).toString(CryptoJS.enc.Utf8);

    let decryptData = JSON.parse(decrypted);

    return decryptData;
  }

  ngOnInit() {
    this.auditTrail.saveLog("Fund Performance", "Open Fund Montly");
    this.userId = localStorage.getItem('userid');

    this.cnf.getAttoken().subscribe((res: any) => {
      if (res.status == 100) {
        this.attoken = this.cnf.generateAttoken(this.projectName, res.datas);
      }

      let dateNow = new Date();
      let yearNow: any = dateNow.getFullYear();
      let monthNow = dateNow.getMonth();

      for (let year = yearNow; year >= yearNow - 10; year--) { this.yearOption.push(year); }
      this.modelYear = yearNow;
      this.modelMonth = monthNow;
      this.doLoadMonth();

      this.cacheService.get(this.cnf.lang + '/fund_name/', this.loadFundName()).subscribe((res: any) => {
        let decryptData = JSON.parse(this.cnf.decryptData(res.datas));

        this.fundNameData = decryptData[0].fund_fact_name;
        this.loadingData = false;
        this.modelFundName = this.fundNameData[0];

        /* ============ MONTHLY | ON INIT ============ */
        this.loadPerformance().subscribe((res: any) => {
          this.loadingData = true;
          if (res.status == 100) {
            let decryptData = JSON.parse(this.cnf.decryptData(res.datas));

            this.monthlyData = decryptData[0].fund_performance;
            this.doGetSearch();

            if (this.monthlyData.length > 0) {
              let monthlyBidPriceOutput = [];
              let monthlyPricingDateOutput = [];
              let chartDataOutput = [];

              for (let i in this.monthlyData) {
                let tempData = this.monthlyData[i].bidPrice;
              }
              this.currency = this.monthlyData[0].moneyCode;

              for (let i in this.monthlyData) {
                let _monthlyData = this.monthlyData[i].bidPrice;
                let subStrData = this.monthlyData[i].pricingDate;
                let _pricingDate = new Date(subStrData.substr(0, 10)).getDate();
                chartDataOutput.push({
                  "name": _pricingDate,
                  "data": _monthlyData,
                });
                monthlyBidPriceOutput.push(Number(_monthlyData));
                monthlyPricingDateOutput.push(_pricingDate);
              }
              this.monthlyBidPriceData = monthlyBidPriceOutput;
              this.monthlyPricingDateData = monthlyPricingDateOutput;

              this.chartDataMonthly = chartDataOutput;

              this.doLoadHighChartMonthly();
            }
          } else {
            this.monthlyData = [];
          }
        });
      });
    });
  }

  doSaveSearch() {
    localStorage.setItem("history_modelFundName", this.modelFundName);
    localStorage.setItem("history_modelYear", this.modelYear);
    localStorage.setItem("history_modelMonth", this.modelMonth);
  }

  doGetSearch() {
    let dateNow = new Date();
    let yearNow: any = dateNow.getFullYear();
    let monthNow = dateNow.getMonth();

    this.modelFundName = (localStorage.getItem("history_modelFundName") ? localStorage.getItem("history_modelFundName") : this.fundNameData[0]);
    this.modelYear = (localStorage.getItem("history_modelYear") ? localStorage.getItem("history_modelYear") : yearNow);
    this.modelMonth = (localStorage.getItem("history_modelMonth") ? localStorage.getItem("history_modelMonth") : monthNow);
  }

  loadFundName() {
    let params = new HttpParams();
    params = params.append('appid', 'test'); params = params.append('appkey', 'on');
    params = params.append('apptype', 'desktop');
    params = params.append('token', this.cnf.token);
    params = params.append('lang', this.cnf.lang);
    params = params.append('attoken', this.attoken);

    return this.http.get(this.cnf.URLWSNonPublicArea + '/fund/fund-name/', { params })
      .map((response: Response) => response);
  }

  loadPerformance() {
    let params = new HttpParams();
    params = params.append('appid', 'test'); params = params.append('appkey', 'on');
    params = params.append('apptype', 'desktop');
    params = params.append('token', this.cnf.token);
    params = params.append('lang', this.cnf.lang);
    params = params.append('attoken', this.attoken);
    let period = this.modelYear + '-' + ("0" + (this.modelMonth)).slice(-2);

    return this.http.get(this.cnf.URLWSNonPublicArea + '/fund/performance/monthly/' + this.modelFundName + '/' + period + '/' + period, { params })
      .map((response: Response) => response);
  }

  doSearch() {
    this.doSaveSearch();
    this.auditTrail.saveLog("Fund Performance", "Search Monthly")
    this.loadingData = false;

    if (this.chart && this.chart.series.length > 0) {
      for (var i = 0; i < this.chart.series.length; i++) {
        this.chart.series[i].remove(true);
      }
    }
    this.monthlyData = [];
    this.cnf.getAttoken().subscribe((res: any) => {
      if (res.status == 100) {
        this.attoken = this.cnf.generateAttoken(this.projectName, res.datas);
      }
      this.loadPerformance().subscribe((res: any) => {
        this.loadingData = true;
        if (res.status == 100) {

          let decryptData = JSON.parse(this.cnf.decryptData(res.datas));

          this.monthlyData = decryptData[0].fund_performance;

          if (this.monthlyData.length > 0) {
            let monthlyBidPriceOutput = [];
            let monthlyPricingDateOutput = [];
            let chartDataOutput = [];

            for (let i in this.monthlyData) {
              let tempData = this.monthlyData[i].bidPrice;
            }
            this.currency = this.monthlyData[0].moneyCode;

            for (let i in this.monthlyData) {
              let _monthlyData = this.monthlyData[i].bidPrice;
              let subStrData = this.monthlyData[i].pricingDate;
              let _pricingDate = new Date(subStrData.substr(0, 10)).getDate();

              chartDataOutput.push({
                "name": _pricingDate,
                "data": _monthlyData,
              });

              monthlyBidPriceOutput.push(Number(_monthlyData));
              monthlyPricingDateOutput.push(_pricingDate);
            }
            this.monthlyBidPriceData = monthlyBidPriceOutput;
            this.monthlyPricingDateData = monthlyPricingDateOutput;

            this.chartDataMonthly = chartDataOutput;

            this.doLoadHighChartMonthly();
          }
        } else {
          this.loadingData = true;
          this.monthlyData = [];
        }
      });
    });
  }

  doLoadHighChartMonthly() {
    let unitPrice = this.translate.instant('_unit_price');
    this.auditTrail.saveLog("Fund Performance", "Fund Monthly load HighChartMonthly");
    let decimalPoint = (this.currency == 'USD' ? '{value:,.2f}' : '{value:,.0f}');

    const options: Highcharts.Options = {
      lang: {
        decimalPoint: ',',
        thousandsSep: '.'
      },
      chart: {
        type: 'line'
      },
      title: {
        text: this.modelFundName
      },
      subtitle: {
        text: 'Currency: ' + this.currency + ' - ' + this.monthOption[this.modelMonth - 1] + ' ' + this.modelYear
      },
      xAxis: {
        categories: this.monthlyPricingDateData
      },
      yAxis: [{
        title: {
          align: 'high',
          rotation: 0,
          offset: 0,
          margin: 0,
          y: 330,
          x: 12,
          text: '',
        },
        labels: {
          format: decimalPoint
        }
      }, {
        title: {
          align: 'high',
          rotation: -90,
          offset: 15,
          margin: 0,
          y: 100,
          x: 0,
          text: unitPrice
        }
      }],
      plotOptions: {
        line: {
          marker: {
            enabled: false
          }
        }
      },
      credits: {
        enabled: false
      },
      colors: ['#FFB617'],
      series: [{
        showInLegend: false,
        name: this.monthOption[this.modelMonth - 1] + ' ' + this.modelYear,
        data: this.monthlyBidPriceData
      }],
      responsive: {
        rules: [{
          condition: {
            maxWidth: 350
          },
          chartOptions: {
            title: {
              text: this.modelFundName,
              widthAdjust: 200
            },
            legend: {
              align: 'center',
              verticalAlign: 'bottom',
              layout: 'horizontal'
            },
            yAxis: [{
              labels: {
                align: 'left',
                x: 0,
                y: -5,
                format: decimalPoint
              },
              title: {
                align: 'high',
                rotation: -90,
                offset: 12,
                margin: 0,
                y: 100,
                x: 0,
                text: unitPrice
              }
            }, {
              title: {
                align: 'high',
                rotation: 0,
                offset: -100,
                margin: 0,
                y: 352,
                x: 0,
                text: '',
              }
            }],
            subtitle: {
              text: 'Currency: ' + this.currency + ' - ' + this.monthOption[this.modelMonth - 1] + ' ' + this.modelYear
            },
            credits: {
              enabled: false
            }
          }
        }, {
          condition: {
            minWidth: 351,
            maxWidth: 767
          },
          chartOptions: {
            title: {
              text: this.modelFundName,
              widthAdjust: 200
            },
            legend: {
              align: 'center',
              verticalAlign: 'bottom',
              layout: 'horizontal'
            },
            yAxis: [{
              labels: {
                align: 'left',
                x: 0,
                y: -5,
                format: decimalPoint
              },
              title: {
                align: 'high',
                rotation: -90,
                offset: 15,
                margin: 0,
                y: 100,
                x: 0,
                text: unitPrice
              }
            }, {
              title: {
                align: 'high',
                rotation: 0,
                offset: -100,
                margin: 0,
                y: 350,
                x: -20,
                text: '',
              }
            }],
            subtitle: {
              text: 'Currency: ' + this.currency + ' - ' + this.monthOption[this.modelMonth - 1] + ' ' + this.modelYear
            },
            credits: {
              enabled: false
            }
          }
        }]
      }
    };

    this.chart = chart(this.PerformanceFundMonthly.nativeElement, options);
  }

  @ViewChild('PerformanceFundMonthly') PerformanceFundMonthly: ElementRef;
  chart: Highcharts.ChartObject;

  doLoadMonth() {
    this.monthOption = [];
    let date = new Date();
    let currentMonth = date.getMonth();
    let currentYear = date.getFullYear();
    let monthOption = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    if (currentYear == this.modelYear) {
      for (let i in monthOption) {
        if (Number(i) < currentMonth) {
          this.monthOption.push(monthOption[i]);
        }
      }
    } else {
      this.monthOption = monthOption;
    }
  }

  doResetFilter() {
    let dateNow = new Date();
    let yearNow: any = dateNow.getFullYear();
    let monthNow = dateNow.getMonth();

    this.modelFundName = this.fundNameData[0];
    this.modelYear = yearNow;
    this.modelMonth = monthNow;

    this.doSearch();
  }

}
