import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tips-trick',
  templateUrl: './tips-trick.component.html',
  styleUrls: ['./tips-trick.component.scss']
})
export class TipsTrickComponent implements OnInit {
  page = 1;
  constructor() { }

  ngOnInit() {
  }

}
