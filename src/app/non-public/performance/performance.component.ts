import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { chart } from 'highcharts';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'charts-performance',
  templateUrl: './performance.component.html',
  styleUrls: ['./performance.component.scss']
})
export class PerformanceComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }


  @ViewChild('PerformanceFundYearly') PerformanceFundYearly: ElementRef;
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
        categories: ['January', 'February', 'March','April', 'May', 'June', 'July','August','September','October','November','December']
      },
      yAxis: {
        title: {
          text: 'IDR'
        }
      },
      series: [{
        name: 'Rupiah Equity Fund',
        data: [1200, 1320, 1100, 1120, 1400, 1100,1020, 1040,1290,1200, 1320, 1100]
      }]
    };
    this.chart = chart(this.PerformanceFundYearly.nativeElement, options);
  };
}
