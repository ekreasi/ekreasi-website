import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'header-page-blue',
  templateUrl: './header-page-blue.component.html',
  styleUrls: ['./header-page-blue.component.scss']
})
export class HeaderPageBlueComponent implements OnInit {

  isCollapsed:boolean;
  constructor(){
    this.isCollapsed = true;
  }

  ngOnInit() {
  }

  changeLanguage(lang: string){
    localStorage.setItem('lang', lang);
  }
}
