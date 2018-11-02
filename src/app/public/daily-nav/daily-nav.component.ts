import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-daily-nav',
  templateUrl: './daily-nav.component.html',
  styleUrls: ['./daily-nav.component.scss']
})
export class DailyNavComponent implements OnInit {
  page = 1;
  constructor() { }

  ngOnInit() {
  }
  modelStart;
  modelEnd;

  valuedate = new Date();
}
