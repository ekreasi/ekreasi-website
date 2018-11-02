import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-policy-detail',
  templateUrl: './policy-detail.component.html',
  styleUrls: ['./policy-detail.component.scss']
})
export class PolicyDetailComponent implements OnInit {
  page = 1;
  constructor() { }

  ngOnInit() {
  }
  modelStart;
  modelEnd;

  valuedate = new Date();
}
