import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { chart } from 'highcharts';
import * as Highcharts from 'highcharts';
Highcharts.setOptions({ lang: { thousandsSep: ',' } });

@Component({
  selector: 'perfomance-fund-yearly',
  templateUrl: './fund-yearly.component.html',
  styleUrls: ['./fund-yearly.component.scss']
})
export class FundYearlyComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  @ViewChild('FundYearly') FundYearly: ElementRef;
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
        categories: ['January', 'February', 'March','April', 'May', 'June', 'July','August','September','October','November','December']
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
      colors:['#01C1D5'],
      series: [{
        name: '2017',
        data: [1200, 1320, 1100, 1120, 1400, 1100,1020, 1040,1290,1200, 1320, 1100]
      }]
    };
    this.chart = chart(this.FundYearly.nativeElement, options);
  };
}
