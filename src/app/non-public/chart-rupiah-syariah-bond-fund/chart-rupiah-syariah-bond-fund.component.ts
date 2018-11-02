import { Component, OnInit, ElementRef, ViewChild} from '@angular/core';
import { chart } from 'highcharts';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'chart-rupiah-syariah-bond-fund',
  templateUrl: './chart-rupiah-syariah-bond-fund.component.html',
  styleUrls: ['./chart-rupiah-syariah-bond-fund.component.scss']
})
export class ChartRupiahSyariahBondFundComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  @ViewChild('chartRupiahSyariahBondFund') chartRupiahSyariahBondFund: ElementRef;
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
        text: 'Global Equity Fund Syariah'
      },
      xAxis: {
        categories: ['5', '10', '15','20', '25', '30']
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
          text: 'Currency:USD'
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
        name: 'Bulan',
        data: [90, 102, 95, 102, 120, 115,125]
      }]
    };
    this.chart = chart(this.chartRupiahSyariahBondFund.nativeElement, options);
  };
}
