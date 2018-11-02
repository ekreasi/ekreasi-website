import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'header-page-orange',
  templateUrl: './header-page-orange.component.html',
  styleUrls: ['./header-page-orange.component.scss']
})
export class HeaderPageOrangeComponent implements OnInit {

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
