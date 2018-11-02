import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'header-page-red',
  templateUrl: './header-page-red.component.html',
  styleUrls: ['./header-page-red.component.scss']
})
export class HeaderPageRedComponent implements OnInit {

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
