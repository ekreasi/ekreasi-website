import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'header-page-tosca',
  templateUrl: './header-page-tosca.component.html',
  styleUrls: ['./header-page-tosca.component.scss']
})
export class HeaderPageToscaComponent implements OnInit {

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
