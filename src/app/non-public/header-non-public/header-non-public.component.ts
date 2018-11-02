import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'header-non-public',
  templateUrl: './header-non-public.component.html',
  styleUrls: ['./header-non-public.component.scss']
})
export class HeaderNonPublicComponent implements OnInit {

  isCollapsed:boolean;
  constructor(){
    this.isCollapsed = true;
  }


  ngOnInit() {
  }

}
