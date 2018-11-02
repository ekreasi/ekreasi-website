import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-proposal-information',
  templateUrl: './proposal-information.component.html',
  styleUrls: ['./proposal-information.component.scss']
})
export class ProposalInformationComponent implements OnInit {
  page = 4;
  constructor() { }

  ngOnInit() {
  }

}
