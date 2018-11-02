import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tracking',
  templateUrl: './tracking.component.html',
  styleUrls: ['./tracking.component.scss']
})
export class TrackingComponent implements OnInit {
  page = 1;
  constructor() { }

  ngOnInit() {
  }
  modelStart;
  modelEnd;

  valuedate = new Date();
}
