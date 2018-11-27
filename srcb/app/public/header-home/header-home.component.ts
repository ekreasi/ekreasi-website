import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Location } from '@angular/common';
import { Config } from '../../config';
import { AuditTrail } from './../../audit-trail';

import { Router } from '@angular/router';
import { CacheService } from '../../cache.service';
import { HttpClient, HttpParams } from "@angular/common/http";

@Component({
  selector: 'header-home',
  templateUrl: './header-home.component.html',
  styleUrls: ['./header-home.component.scss'],
  providers: [Config, AuditTrail]
})
export class HeaderHomeComponent implements OnInit {
  isCollapsed: boolean;
  search: string = '';
  linkMenu: any = {};
  public lang: any;

  constructor(private cacheService: CacheService, private router: Router, private translate: TranslateService, private location: Location, private cnf: Config, private http: HttpClient) {
    this.isCollapsed = true;
  }

  ngOnInit() {
    this.cacheService.get('/assets/config/menu.json', this.loadLinkMenu()).subscribe((res: any) => {
      this.linkMenu = res;
    });
    this.loadTranslate();
  }

  loadTranslate() {
    this.lang = this.cnf.lang;

    this.translate.addLangs([this.lang]);
    this.translate.setDefaultLang('id');
    this.translate.use(this.lang);
  }

  changeLanguage(lang: string) {
    localStorage.setItem('lang', lang);
    location.reload();
  }

  loadLinkMenu() {
    return this.http.get('/assets/config/menu.json')
      .map((response: Response) => response);
  }

  doSearch() {
    this.router.navigate(['/result-page/', this.search]);
  }

  addCloseClass() {
    var x = document.getElementById("burger");
    x.classList.toggle("change");
  }
}
