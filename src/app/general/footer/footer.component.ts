import { Router } from '@angular/router';
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Config } from '../../config';
import { AuditTrail } from './../../audit-trail';
import { Title } from '@angular/platform-browser';
import { CacheService } from '../../cache.service';
import { SwalComponent } from '../../../../node_modules/@toverux/ngx-sweetalert2';
import { UserIdleService } from 'angular-user-idle';
import swal from 'sweetalert2';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  providers: [Config, AuditTrail],
  encapsulation: ViewEncapsulation.None
})
export class FooterComponent implements OnInit {
  @ViewChild('swalError') private swalError: SwalComponent;
  @ViewChild('swalSession') private swalSession: SwalComponent;
  public data: any = {};
  linkMenu: any = {};
  public loadingData: boolean = false;
  errorMessage: string;
  idle: number;
  timeout: number;
  ping: number;
  timeSession: any = '';
  hideBrowserInformation: string = 'false';

  constructor(private cnf: Config, private auditTrail: AuditTrail, private titleService: Title, private http: HttpClient, private cacheService: CacheService, private userIdle: UserIdleService, private router: Router) {

  }

  ngOnInit() {
    this.hideBrowserInformation = ( localStorage.getItem('hideBrowserInformation') ? localStorage.getItem('hideBrowserInformation') : 'false' );
    this.cacheService.get('/assets/config/menu.json', this.loadLinkMenu()).subscribe((res: any) => {
      this.linkMenu = res;
    });
    window.scrollTo(0, 0);
    this.cacheService.get(this.cnf.lang + '/contact', this.loadData()).subscribe((res: any) => {
      this.loadingData = true;
      if (res.status == 100) {
        this.data = JSON.parse(this.cnf.decryptData(res.datas));
      }
    });
    if (this.cnf.token) {
      // Check token first
      this.loadToken().subscribe((res: any) => {
        if (res.status != 100) {
          this.doLogout();
        }
      });

      // Check user idle
      this.idle = this.userIdle.getConfigValue().idle;
      this.timeout = this.userIdle.getConfigValue().timeout;
      this.ping = this.userIdle.getConfigValue().ping;
      this.cacheService.get(this.cnf.lang + '/user_frontend', this.loadSession()).subscribe((res: any) => {
        this.loadingData = true;
        if (res.status == 100) {
          this.timeSession = res.datas;

          // this.userIdle.idle = this.timeSession;
          // this.userIdle.timeout = this.timeSession - 10;
          this.idle = this.userIdle.getConfigValue().idle;
          this.userIdle.stopWatching();
          this.userIdle.startWatching();
          this.userIdle.onTimerStart().subscribe(count => {
            if (count == 1) {
              this.swalSession.show();
            }
          });
          this.userIdle.onTimeout().subscribe(() => {
            this.doLogout();
          });
    
          this.loadToken().subscribe((res: any) => {
            if (res.status != 100) {
              this.doLogout();
            }
          });
        }
      });
    }
  }

  loadData() {
    let params = new HttpParams();
    params = params.append('appid', this.cnf.appid);
    params.append('appkey', this.cnf.appkey);
    params = params.append('lang', this.cnf.lang);

    return this.http.get(this.cnf.URLWS + '/contact/frontend/all', { params })
      .map((response: Response) => response);
  }

  loadSession() {
    let params = new HttpParams();
    params = params.append('appid', this.cnf.appid);
    params.append('appkey', this.cnf.appkey);

    return this.http.get(this.cnf.URLWSNonPublicArea + '/user_frontend/getfrontendtime?', { params })
      .map((response: Response) => response);
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

  showErrorMessage(message: string) {
    this.errorMessage = message;
    setTimeout(() => {
      this.swalError.show();
    }, 500);
  }

  loadLinkMenu() {
    return this.http.get('/assets/config/menu.json')
      .map((response: Response) => response);
  }

  // doLogout() {
  //   localStorage.clear();
  //   this.auditTrail.saveLog("Home", "Logout");
  //   this.router.navigate(['/']);
  //   location.reload();
  // }

  doLogout() {
    var url = this.cnf.URLWSNonPublicArea + '/user_frontend/logout?appid=' + this.cnf.appid + '&appkey=' + this.cnf.appkey + '&token=' + this.cnf.token;
    this.http.get(url).subscribe(res => {
      this.auditTrail.saveLog("Home", "Logout");
      localStorage.clear();
      this.router.navigate(['/']);
      location.reload();
    });
  }

  doResetTime() {
    this.userIdle.resetTimer();
  }

  closeBrowserInformation() {
    localStorage.setItem("hideBrowserInformation", "true");
    this.hideBrowserInformation = "true";
  }
}
