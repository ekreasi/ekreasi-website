import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { chart } from 'highcharts';
import * as Highcharts from 'highcharts';
Highcharts.setOptions({ lang: { thousandsSep: ',' } });
@Component({
  selector: 'performance-fund-monthly',
  templateUrl: './fund-monthly.component.html',
  styleUrls: ['./fund-monthly.component.scss']
})
export class FundMonthlyComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  @ViewChild('FundMonthly') FundMonthly: ElementRef;
  chart: Highcharts.ChartObject;
  ngAfterViewInit() {
    const options: Highcharts.Options = {
      lang: {
        thousandsSep: ','
      },
      chart: {
        type: 'line'
      },
      title: {
        text: 'ekreasi Rupiah Equity Fund'
      },
      xAxis: {
        categories: ['5', '10', '15','20', '25', '30']
      },
      yAxis: {
        title: {
          align: 'high',
          rotation: 0,
          offset: 0,
          margin: 0,
          y: 350,
          x: 0,
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
      colors:['#FFB617'],
      series: [{
        name: 'January 2017',
        data: [1000, 1020, 1100, 1150, 1000, 1030, ]
      }]
    };
    this.chart = chart(this.FundMonthly.nativeElement, options);
  };
}
