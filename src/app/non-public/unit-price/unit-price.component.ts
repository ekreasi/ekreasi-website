import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-unit-price',
  templateUrl: './unit-price.component.html',
  styleUrls: ['./unit-price.component.scss']
})
export class UnitPriceComponent implements OnInit {
  page = 4;
  constructor() { }

  ngOnInit() {
  }
  modelStart;
  modelEnd;

  valuedate = new Date();
}
