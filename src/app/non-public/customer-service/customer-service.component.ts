import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-customer-service',
  templateUrl: './customer-service.component.html',
  styleUrls: ['./customer-service.component.scss']
})
export class CustomerServiceComponent implements OnInit {
  page = 1;
  constructor(private _location: Location) { }

  ngOnInit() {
  }

  backClicked() {
    this._location.back();
  }

}
