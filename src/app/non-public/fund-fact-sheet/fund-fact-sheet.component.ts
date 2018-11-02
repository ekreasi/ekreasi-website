import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-fund-fact-sheet',
  templateUrl: './fund-fact-sheet.component.html',
  styleUrls: ['./fund-fact-sheet.component.scss']
})
export class FundFactsheetComponent implements OnInit {
  page = 4;
  constructor() { }

  ngOnInit() {
  }

}
