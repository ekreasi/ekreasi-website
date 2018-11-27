import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-customer-service-detail',
  templateUrl: './customer-service-detail.component.html',
  styleUrls: ['./customer-service-detail.component.scss']
})
export class CustomerServiceDetailComponent implements OnInit {

  constructor(private _location: Location) { }

  ngOnInit() {
  }

  backClicked() {
    this._location.back();
  }

}
