import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'header-home',
  templateUrl: './header-home.component.html',
  styleUrls: ['./header-home.component.scss']
})
export class HeaderHomeComponent implements OnInit {
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
