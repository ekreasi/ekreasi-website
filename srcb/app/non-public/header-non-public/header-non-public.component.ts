import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Config } from '../../config';
import { AuditTrail } from './../../audit-trail';
import { Title } from '@angular/platform-browser';
import { HttpParams, HttpClient } from '@angular/common/http';
import { SwalComponent } from '@toverux/ngx-sweetalert2';
import { CacheService } from '../../cache.service';
import swal from 'sweetalert2';

@Component({
  selector: 'header-non-public',
  templateUrl: './header-non-public.component.html',
  styleUrls: ['./header-non-public.component.scss'],
  providers: [Config, AuditTrail]
})
export class HeaderNonPublicComponent implements OnInit {
  @ViewChild('swalError') private swalError: SwalComponent;

  uriSegment: any;
  secondBreadcrumb: any;
  userData: any = {};
  userId: any = '';
  data: any = '';
  isCollapsed: boolean;
  public lang: any;
  linkMenu: any = {};
  showDashboard: boolean = true;
  lastLogin: any = '';
  errorMessage: string = '';
  search: string = '';
  attoken: string = '';
  projectName: string = 'inbox-blast';

  constructor(private cacheService: CacheService, private cnf: Config, private auditTrail: AuditTrail, private titleService: Title, private http: HttpClient, private router: Router, private translate: TranslateService, private location: Location) {
    this.isCollapsed = true;
  }

  ngOnInit() {
    this.cacheService.get('/assets/config/menu.json', this.loadLinkMenu()).subscribe((res: any) => {
      this.linkMenu = res;
    });

    this.uriSegment = this.router.url;
    let uriSegments: any = this.router.parseUrl(this.uriSegment).root.children['primary'].segments;
    let uri1, uri2;

    if (this.uriSegment == '/dashboard') { this.showDashboard = false; }

    uri1 = uriSegments[0].path;

    if (uriSegments.length > 1) {
      uri2 = uriSegments[1].path;

      if (uri2 == 'proposal-information' && uriSegments.length == 3) {
        this.secondBreadcrumb = '_proposal_information';
      } else if (uri2 == 'policy-information' && uriSegments.length == 3) {
        this.secondBreadcrumb = '_policy_information';
      } else if (uri1 == 'history-detail' && uriSegments.length == 2) {
        this.secondBreadcrumb = '_history';
      } else if (uri1 == 'inbox-detail' && uriSegments.length == 2) {
        this.secondBreadcrumb = '_inbox';
      }
    }

    this.userData = (localStorage.getItem('userData') ? JSON.parse(this.cnf.decryptData(localStorage.getItem('userData'))) : '');
    this.lastLogin = new Date(localStorage.getItem('lastLogin'));
    this.userId = localStorage.getItem('userid');
    this.loadTranslate();
    this.cnf.getAttoken().subscribe((res: any) => {
      if (res.status == 100) {
        this.attoken = this.cnf.generateAttoken(this.projectName, res.datas);
      }
      this.loadNotification().subscribe((res: any) => {
        if (res.status == 100) {
          let datas = res.datas;
          this.data = datas;
        }
      });
    });

    if (this.cnf.token == '') {
      this.router.navigate(['/']);
    } else {
      this.loadToken().subscribe((res: any) => {
        if (res.status != 100) {
          this.showErrorMessage(res.message);
          setTimeout(() => {
            this.doLogout();
          }, 500);
        }
      });
    }
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

  doLogout() {
    var url = this.cnf.URLWSNonPublicArea + '/user_frontend/logout?appid=' + this.cnf.appid + '&appkey=' + this.cnf.appkey + '&token=' + this.cnf.token;
    this.http.get(url).subscribe(res => {
      this.auditTrail.saveLog("Home", "Logout");
      localStorage.clear();
      this.router.navigate(['/']);
    });
  }

  showErrorMessage(message: string) {
    this.errorMessage = message;
    setTimeout(() => {
      this.swalError.show();
    }, 500);
  }

  loadToken() {
    let params = new HttpParams();
    params = params.append('appid', 'test');
    params = params.append('appkey', 'on');
    params = params.append('apptype', 'desktop');
    params = params.append('token', this.cnf.token);

    return this.http.get(this.cnf.URLWSNonPublicArea + '/user_frontend/checkToken/', { params })
      .map((response: Response) => response);
  }

  loadNotification() {
    let params = new HttpParams();
    params = params.append('appid', 'test');
    params = params.append('appkey', 'on');
    params = params.append('apptype', 'desktop');
    params = params.append('attoken', this.attoken);

    return this.http.get(this.cnf.URLWSNonPublicArea + '/inbox_blast/frontend/notification/' + this.userId, { params })
      .map((response: Response) => response);
  }

  loadLinkMenu() {
    return this.http.get('/assets/config/menu.json')
      .map((response: Response) => response);
  }

  doSearch() {
    this.auditTrail.saveLog("Home", "Search");
    this.router.navigate(['/result-page/', this.search]);
  }

  addCloseClass() {
    var x = document.getElementById("burger");
    x.classList.toggle("change");
  }

  backClicked() {
    this.location.back();
  }

}
