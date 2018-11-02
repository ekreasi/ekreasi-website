import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-policy-information',
  templateUrl: './policy-information.component.html',
  styleUrls: ['./policy-information.component.scss']
})
export class PolicyInformationComponent implements OnInit {
  page = 1;
  constructor() { }

  ngOnInit() {
  }

}
