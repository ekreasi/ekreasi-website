import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'header-page',
  templateUrl: './header-page.component.html',
  styleUrls: ['./header-page.component.scss']
})
export class HeaderPageComponent implements OnInit {

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
