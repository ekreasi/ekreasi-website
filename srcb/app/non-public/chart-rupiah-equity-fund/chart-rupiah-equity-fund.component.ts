import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit, ElementRef, ViewChild, Input } from '@angular/core';
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
  selector: 'chart-rupiah-equity-fund',
  templateUrl: './chart-rupiah-equity-fund.component.html',
  styleUrls: ['./chart-rupiah-equity-fund.component.scss'],
  providers: [Config, AuditTrail]
})

export class ChartRupiahEquityFundComponent implements OnInit {
  @Input() modelFundName: any = '';
  params: any;
  fundNameData: any = [];
  monthlyData: any = [];
  monthlyPricingDateData: any = [];
  monthlyBidPriceData: any = [];
  chartDataMonthly: any = [];
  currency: string = '';
  attoken: string = '';
  projectName: string = 'fund';

  yearOption: any = [];
  monthOption: any = [];

  modelYear: any;
  modelMonth: any;
  public loadingData: boolean = false;

  constructor(
    private route: ActivatedRoute, 
    private cnf: Config, 
    private auditTrail: AuditTrail, 
    private titleService: Title, 
    private http: HttpClient, 
    private cacheService: CacheService,
    private translate: TranslateService
  ) {

  }

  ngOnInit() {
    let lang = this.cnf.lang;
    let dateNow = new Date();
    let yearNow: any = dateNow.getFullYear();
    let monthNow = dateNow.getMonth();
    this.modelYear = yearNow;
    this.modelMonth = monthNow;
    this.monthOption = ( lang == 'en' ? ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'] : ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'] );

    /* ============ MONTHLY | ON INIT ============ */
    this.cnf.getAttoken().subscribe((res: any) => {
      if (res.status == 100) {
        this.attoken = this.cnf.generateAttoken(this.projectName, res.datas);
      }
      this.loadPerformance().subscribe((res: any) => {
        if (res.status == 100) {
          let decryptData = JSON.parse(this.cnf.decryptData(res.datas));

          this.monthlyData = decryptData[0].fund_performance;
          this.loadingData = true;

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
                "data": _monthlyData
              });
              monthlyBidPriceOutput.push(Number(_monthlyData));
              monthlyPricingDateOutput.push(_pricingDate);
            }
            this.monthlyBidPriceData = monthlyBidPriceOutput;
            this.monthlyPricingDateData = monthlyPricingDateOutput;

            this.chartDataMonthly = chartDataOutput;

            this.doLoadHighChartMonthly();
          }
        }
      });
    });
  }

  doLoadHighChartMonthly() {
    let unitPrice = this.translate.instant('_unit_price');
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
        text: 'Currency: ' + this.currency + ' - ' + this.monthOption[this.modelMonth - 1] + ' ' + this.modelYear
      },
      xAxis: {
        categories: this.monthlyPricingDateData
      },
      yAxis: [
        {
          title: {
            align: 'high',
            rotation: 0,
            offset: 0,
            margin: 0,
            y: 330,
            x: 25,
            text: '',
          },
          labels: {
            format: decimalPoint
          }
        }, {
          title: {
            align: 'high',
            rotation: -90,
            offset: 0,
            margin: 0,
            y: 50,
            x: -10,
            text: unitPrice
          }
        }
      ],
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
    };

    this.chart = chart(this.chartRupiahEquityFund.nativeElement, options);
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

  @ViewChild('chartRupiahEquityFund') chartRupiahEquityFund: ElementRef;
  chart: Highcharts.ChartObject;
}
