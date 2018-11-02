import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'header-page-green',
  templateUrl: './header-page-green.component.html',
  styleUrls: ['./header-page-green.component.scss']
})
export class HeaderPageGreenComponent implements OnInit {

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
