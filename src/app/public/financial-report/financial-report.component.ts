import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Config } from '../../config';

@Component({
  selector: 'app-financial-report',
  templateUrl: './financial-report.component.html',
  styleUrls: ['./financial-report.component.scss'],
	providers: [ Config ]
})
export class FinancialReportComponent implements OnInit {
  public data : any = {};

  constructor( private cnf: Config, private http:HttpClient ) {

  }
  ngOnInit() {
    this.http.get( this.cnf.URLWS + '/financial_report/frontend/all?appid=3K123451&appkey=3K123451&token=QOQs22TWUQgSKeaUU457&lang=' + this.cnf.lang )
		.subscribe(
      (res:any) => {
        if(res.status == 100){
          this.data = res.datas;
        }
      },
      response => {
        console.log("GET call in error", response);
      },
      () => {
        console.log("The GET observable is now completed.");
      }
    );
  }

}
