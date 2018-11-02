import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'menu-dashboard-horizontal',
  templateUrl: './menu-dashboard-horizontal.component.html',
  styleUrls: ['./menu-dashboard-horizontal.component.scss']
})
export class MenuDashboardHorizontalComponent implements OnInit {
  isCollapsed:boolean;
  constructor(){
    this.isCollapsed = true;
  }
  ngOnInit() {
  }

}
