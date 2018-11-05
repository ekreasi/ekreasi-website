import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Location } from '@angular/common';
import { Config } from '../../config'; 
import { AuditTrail } from './../../audit-trail';

import { Router } from '@angular/router';
import { CacheService } from '../../cache.service';
import { HttpClient, HttpParams } from "@angular/common/http";
import swal from 'sweetalert2';

@Component({
  selector: 'header-page-green',
  templateUrl: './header-page-green.component.html',
  styleUrls: ['./header-page-green.component.scss'],
	providers: [ Config, AuditTrail ]
})
export class HeaderPageGreenComponent implements OnInit {

  isCollapsed:boolean;
  public lang: any;
  token: any;
  userData: any = {};
  linkMenu: any = {};
  search: any;
  
  constructor(private cacheService: CacheService, private router: Router, private translate: TranslateService, private location: Location, private cnf: Config, private http: HttpClient ){
    this.isCollapsed = true;
  }

  ngOnInit() {
    this.cacheService.get('/assets/config/menu.json', this.loadLinkMenu()).subscribe((res: any) => {
      this.linkMenu = res;
    });
    this.loadTranslate();
    this.token = this.cnf.token;
    this.userData = ( localStorage.getItem('userData') ? JSON.parse( this.cnf.decryptData( localStorage.getItem('userData') ) ) : '' );
  }

  loadTranslate() {
    this.lang = this.cnf.lang;
    
    this.translate.addLangs([this.lang]);
    this.translate.setDefaultLang('id');
    this.translate.use(this.lang);
  }

  changeLanguage(lang: string){
    localStorage.setItem('lang', lang);
    location.reload();
  }

  doSearch() {
    this.router.navigate(['/result-page/', this.search]);
  }

  loadLinkMenu() {
    return this.http.get('/assets/config/menu.json')
      .map((response: Response) => response);
  }
  
  // doLogout() {
  //   localStorage.clear();
  //   this.router.navigate(['/']);
  // }

  doLogout() {
    var url = this.cnf.URLWSNonPublicArea + '/user_frontend/logout?appid=' + this.cnf.appid + '&appkey=' + this.cnf.appkey + '&token=' + this.cnf.token;
      this.http.get(url).subscribe(res => {
        localStorage.clear();
        this.router.navigate(['/']);
      });
  }

  addCloseClass() {
    var x = document.getElementById("burger");
    x.classList.toggle("change");
  }
}
