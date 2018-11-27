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
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';
Highcharts.setOptions({ lang: { thousandsSep: ',' } });

@Component({
  selector: 'perfomance-fund-yearly',
  templateUrl: './fund-yearly.component.html',
  styleUrls: ['./fund-yearly.component.scss'],
  providers: [Config, AuditTrail]
})

export class FundYearlyComponent implements OnInit {
  params: any;
  fundNameData: any = [];
  yearlyData: any = [];
  yearlyPricingDateData: any = [];
  yearlyBidPriceData: any = [];
  chartDataYearly: any = [];
  currency: string = '';
  attoken: string = '';
  projectName: string = 'fund';

  yearOption: any = [];
  monthOption: any = [];

  modelFundName: any;
  modelYear: any;
  public loadingData: boolean = false;
  public userId: any = '';

  constructor(private route: ActivatedRoute,
    private cnf: Config,
    private auditTrail: AuditTrail,
    private titleService: Title,
    private http: HttpClient,
    private cacheService: CacheService,
    private translate: TranslateService) {
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
    this.userId = localStorage.getItem('userid');
    this.cnf.getAttoken().subscribe((res: any) => {
      if (res.status == 100) {
        this.attoken = this.cnf.generateAttoken(this.projectName, res.datas);
      }

      let dateNow = new Date();
      let yearNow: any = dateNow.getFullYear();

      for (let year = yearNow; year >= yearNow - 10; year--) { this.yearOption.push(year); }
      // this.monthOption = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      this.monthOption = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      this.modelYear = yearNow;

      this.cacheService.get(this.cnf.lang + '/fund_name/', this.loadFundName()).subscribe((res: any) => {
        let decryptData = JSON.parse(this.cnf.decryptData(res.datas));

        this.fundNameData = decryptData[0].fund_fact_name;
        this.loadingData = true;
        this.modelFundName = this.fundNameData[0];

        /* ============ YEARLY | ON INIT ============ */
        this.loadPerformance().subscribe((res: any) => {
          if (res.status == 100) {
            let decryptData = JSON.parse(this.cnf.decryptData(res.datas));

            this.yearlyData = decryptData[0].fund_performance;
            this.doGetSearch();

            let yearlyBidPriceOutput = [];
            let yearlyPricingDateOutput = [];
            let chartDataOutput = [];

            for (let i in this.yearlyData) {
              let tempData = this.yearlyData[i].bidPrice;
            }
            this.currency = this.yearlyData[0].moneyCode;

            let lastMonth;
            for (let i in this.yearlyData) {
              let substrData = this.yearlyData[i].pricingDate;
              let pricingDateMonth = new Date(substrData.substr(0, 10)).getMonth();
              if (lastMonth != pricingDateMonth) {
                lastMonth = pricingDateMonth;
                let _yearlyData = this.yearlyData[i].bidPrice;
                let _pricingDate = pricingDateMonth;
                chartDataOutput.push({
                  "name": this.monthOption[_pricingDate],
                  "data": _yearlyData,
                });
                yearlyBidPriceOutput.push(Number(_yearlyData));
                yearlyPricingDateOutput.push(this.monthOption[_pricingDate]);
              }
            }
            this.yearlyBidPriceData = yearlyBidPriceOutput;
            this.yearlyPricingDateData = yearlyPricingDateOutput;

            this.chartDataYearly = chartDataOutput;

            this.loadingData = true;
            this.doLoadHighChartYearly();
          } else {
            this.loadingData = true;
            this.yearlyData = [];
          }
        });
      });
    });
  }

  doSaveSearch() {
    localStorage.setItem("fund_modelFundName", this.modelFundName);
    localStorage.setItem("fund_modelYear", this.modelYear);
  }

  doGetSearch() {
    let dateNow = new Date();
    let yearNow: any = dateNow.getFullYear();

    this.modelFundName = (localStorage.getItem("fund_modelFundName") ? localStorage.getItem("fund_modelFundName") : this.fundNameData[0]);
    this.modelYear = (localStorage.getItem("fund_modelYear") ? localStorage.getItem("fund_modelYear") : yearNow);
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
    let period = this.modelYear;

    return this.http.get(this.cnf.URLWSNonPublicArea + '/fund/performance/yearly/' + this.modelFundName + '/' + period + '/' + period, { params })
      .map((response: Response) => response);
  }

  doSearch() {
    this.doSaveSearch();
    this.auditTrail.saveLog("Fund Performance", "Search Yearly");
    this.loadingData = false;
    for (var i = 0; i < this.chart.series.length; i++) {
      this.chart.series[i].remove(true);
    }
    this.cnf.getAttoken().subscribe((res: any) => {
      if (res.status == 100) {
        this.attoken = this.cnf.generateAttoken(this.projectName, res.datas);
      }
      this.loadPerformance().subscribe((res: any) => {
        this.loadingData = true;
        if (res.status == 100) {

          let decryptData = JSON.parse(this.cnf.decryptData(res.datas));

          this.yearlyData = decryptData[0].fund_performance;
          let yearlyBidPriceOutput = [];
          let yearlyPricingDateOutput = [];
          let chartDataOutput = [];

          for (let i in this.yearlyData) {
            let tempData = this.yearlyData[i].bidPrice;
          }
          this.currency = this.yearlyData[0].moneyCode;

          let lastMonth;
          for (let i in this.yearlyData) {
            let substrData = this.yearlyData[i].pricingDate;
            let pricingDateMonth = new Date(substrData.substr(0, 10)).getMonth();
            if (lastMonth != pricingDateMonth) {
              lastMonth = pricingDateMonth;
              let _yearlyData = this.yearlyData[i].bidPrice;
              let _pricingDate = pricingDateMonth;
              // let _pricingDate = new Date(this.yearlyData[i].pricingDate).getMonth();
              chartDataOutput.push({
                "name": this.monthOption[_pricingDate],
                "data": _yearlyData,
              });
              yearlyBidPriceOutput.push(Number(_yearlyData));
              yearlyPricingDateOutput.push(this.monthOption[_pricingDate]);
            }
          }
          this.yearlyBidPriceData = yearlyBidPriceOutput;
          this.yearlyPricingDateData = yearlyPricingDateOutput;

          this.chartDataYearly = chartDataOutput;

          this.doLoadHighChartYearly();
        } else {
          this.loadingData = true;
          this.yearlyData = [];
        }
      });
    });
  }

  doLoadHighChartYearly() {
    let unitPrice = this.translate.instant('_unit_price');
    this.auditTrail.saveLog("Fund Performance", "Load Fund Yearly High Char Yearly ");
    let decimalPoint = ( this.currency == 'USD' ? '{value:,.2f}' : '{value:,.0f}');

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
        text: 'Currency: ' + this.currency + ' - ' + this.modelYear
      },
      xAxis: {
        categories: this.yearlyPricingDateData
      },
      yAxis: [{
        title: {
          align: 'high',
          rotation: 0,
          offset: 0,
          margin: 0,
          y: 330,
          x: 15,
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
      colors: ['#01C1D5'],
      series: [{
        showInLegend: false,
        name: this.modelYear,
        data: this.yearlyBidPriceData
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
              text: 'Currency: ' + this.currency + ' - ' + this.modelYear
            },
            credits: {
              enabled: false
            }
          }
        },{
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
              text: 'Currency: ' + this.currency + ' - ' + this.modelYear
            },
            credits: {
              enabled: false
            }
          }
        }]
      }
    };
    this.chart = chart(this.PerformanceFundYearly.nativeElement, options);
  }

  doResetFilter() {
    let dateNow = new Date();
    let yearNow: any = dateNow.getFullYear();

    this.modelFundName = this.fundNameData[0];
    this.modelYear = yearNow;
    this.doSearch();
  }

  @ViewChild('PerformanceFundYearly') PerformanceFundYearly: ElementRef;
  chart: Highcharts.ChartObject;
}
