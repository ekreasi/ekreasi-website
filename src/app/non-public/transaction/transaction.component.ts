import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss']
})
export class TransactionComponent implements OnInit {
  page = 4;
  transactionData: any;
  constructor(private _location: Location) { }

  ngOnInit() {
    this.transactionData = [
      {
          "policyCode": "0000001250",
          "serviceName": "ILP Change Regular Premium Apportionment",
          "statusDesc": "In Force",
          "applicationDate": "2009-06-05 00:00:00.0",
          "transactionDate": "2009-06-05 17:00:42.0"
      },
      {
          "policyCode": "0000001250",
          "serviceName": "ILP Change Regular Premium Apportionment",
          "statusDesc": "In Force",
          "applicationDate": "2009-07-31 00:00:00.0",
          "transactionDate": "2009-07-31 15:20:01.0"
      },
      {
          "policyCode": "0000020713",
          "serviceName": "ILP Change Regular Premium Apportionment",
          "statusDesc": "Undo",
          "applicationDate": "2009-09-07 00:00:00.0",
          "transactionDate": "2009-09-07 18:37:55.0"
      },
      {
          "policyCode": "0000020713",
          "serviceName": "ILP Change Regular Premium Apportionment",
          "statusDesc": "Rejected",
          "applicationDate": "2009-09-08 00:00:00.0",
          "transactionDate": "2009-09-08 10:08:19.0"
      },
    ];
  }

  backClicked() {
    this._location.back();
  }

}
