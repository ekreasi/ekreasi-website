import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { chart } from 'highcharts';
import * as Highcharts from 'highcharts';
Highcharts.setOptions({ lang: { thousandsSep: ',' } });
@Component({
  selector: 'chart-rupiah-equity-fund',
  templateUrl: './chart-rupiah-equity-fund.component.html',
  styleUrls: ['./chart-rupiah-equity-fund.component.scss']
})
export class ChartRupiahEquityFundComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }


  @ViewChild('chartRupiahEquityFund') chartRupiahEquityFund: ElementRef;
  chart: Highcharts.ChartObject;
  ngAfterViewInit() {
    const options: Highcharts.Options = {
      chart: {
        type: 'line'
      },
      title: {
        text: 'Rupiah Equity Fund'
      },
      xAxis: {
        categories: ['15', '10', '15','20', '25', '30']
      },
      yAxis: {
        title: {
          align: 'high',
          textAlign: 'left',
          rotation: 0,
          offset: 0,
          margin: 0,
          y: 350,
          x: -40,
          text: 'Currency:IDR'
        }
      },
      plotOptions: {
          line: {
              marker: {
                  enabled: false
              }
          }
      },
      colors:['#FF0198'],
      series: [{
        name: 'Rupiah Equity Fund',
        data: [1000, 1020, 1100, 1150, 1000, 1030, 1000, 1010]
      }],
      lang: {
        decimalPoint: '.',
        thousandsSep: ','
      }
    };
    this.chart = chart(this.chartRupiahEquityFund.nativeElement, options);
  };
}
