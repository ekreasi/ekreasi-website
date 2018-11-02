import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header-page-violet',
  templateUrl: './header-page-violet.component.html',
  styleUrls: ['./header-page-violet.component.scss']
})
export class HeaderPageVioletComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  changeLanguage(lang: string){
    localStorage.setItem('lang', lang);
  }
}
