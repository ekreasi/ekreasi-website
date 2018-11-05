import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Router, ActivatedRoute } from "@angular/router";
import { NgxCarousel } from 'ngx-carousel';
import { UserInternal } from './../../validation';
import { Config } from '../../config';
import { AuditTrail } from './../../audit-trail';
import { Title } from '@angular/platform-browser';
import { CacheService } from '../../cache.service';
import { TranslateService } from '@ngx-translate/core';
import { SwalComponent } from '@toverux/ngx-sweetalert2';
import * as CryptoJS from 'crypto-js';
import swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [Config, AuditTrail]
})

export class HomeComponent implements OnInit {
  @ViewChild('loginErrorSwal') private loginErrorSwal: SwalComponent;
  @ViewChild('swal') private swal: SwalComponent;

  public h1: any = [];
  public h2: any = [];
  public dateStart: any;
  public dateEnd: any;
  public dailyNavData: any = [];
  public userInternal: UserInternal;
  public carouselOne: NgxCarousel;
  public dataCarousel: any = [];
  public data: any;
  public personalData: any;
  public res: any;
  public loadingBanner: boolean = false;
  public loadingNav: boolean = false;
  public loadingSignin: boolean = false;
  public defaultImage: any;
  public userId: any = '';
  public idUser: any = '';
  public loadingData: boolean = false;
  public userData: any = {};
  public token: any;
  public lastLogin: any = '';
  linkMenu: any = {};
  public datas: any = '';
  public preview: any = '';
  public previewToken: any;
  public bannerBorderColor: any = 'banner-bl-tosca';
  attoken: string = '';
  attokenNotification: string;
  projectName: string = 'fund';
  public swalData: any = {};

  constructor(
    private cnf: Config, private auditTrail: AuditTrail, private titleService: Title,
    private http: HttpClient,
    private cacheService: CacheService,
    private router: Router,
    private translate: TranslateService,
    private route: ActivatedRoute
  ) {
    this.route.queryParams.subscribe(params => {
      this.preview = params['preview'];
      this.previewToken = params['token'];

      let colors = ['banner-bl-blue', 'banner-bl-orange', 'banner-bl-tosca', 'banner-bl-red', 'banner-bl-green', 'banner-bl-magenta', 'banner-bl-yellow', 'banner-bl-purple'];
      this.bannerBorderColor = colors[Math.floor(Math.random() * colors.length)];

    });
  }

  ngOnInit() {
    this.cacheService.get('/assets/config/menu.json', this.loadLinkMenu()).subscribe((res: any) => {
      this.linkMenu = res;
    });
    this.titleService.setTitle(this.cnf.prefixTitle);
    this.userData = (localStorage.getItem('userData') ? JSON.parse(this.cnf.decryptData(localStorage.getItem('userData'))) : '');
    this.token = this.cnf.token;
    this.lastLogin = new Date(localStorage.getItem('lastLogin'));
    this.idUser = localStorage.getItem('userid');

    this.userInternal = new UserInternal({ email: "", password: "" })
    // Carousel 
    this.carouselOne = {
      grid: { xs: 1, sm: 1, md: 1, lg: 1, all: 0 },
      slide: 1,
      speed: 400,
      interval: 4000,
      point: {
        visible: true
      },
      load: 2,
      touch: true,
      loop: true,
      custom: 'banner'
    }

    this.data = this.cacheService.get(this.cnf.lang + '/banner', this.loadData()).subscribe((res: any) => {
      this.loadingBanner = true;
      if (res.status == 100) {
        for (let i in res.datas) {
          let dataTemp = res.datas[i];
          dataTemp.description = this.cnf.strip_tags(dataTemp.description, [dataTemp.description, "b", "i", "u"]).replace(/<br\s*\/?>/gi, '');
          this.dataCarousel.push(dataTemp);
        }
      } else {
        this.dataCarousel = false;
      }
    });

    if (this.token) {
      this.cnf.getAttoken().subscribe((res: any) => {
        if (res.status == 100) {
          let projectName = 'inbox-blast';
          this.attokenNotification = this.cnf.generateAttoken(projectName, res.datas);
        }
        this.loadNotification().subscribe((res: any) => {
          if (res.status == 100) {
            let resDatas = res.datas;
            this.datas = resDatas;
          }
        });
      });
    }

    this.cnf.getAttoken().subscribe((res: any) => {
      if (res.status == 100) {
        let projectName = 'fund';
        this.attoken = this.cnf.generateAttoken(projectName, res.datas);
      }

      this.cacheService.get(this.cnf.lang + '/fund_daily_nav_h1/', this.loadH1()).subscribe((res: any) => {

        if (res.status == 100) {
          let decryptData = JSON.parse(this.cnf.decryptData(res.datas));
          this.h1 = decryptData[0].fund_daily_nav;
        }

        this.cacheService.get(this.cnf.lang + '/fund_daily_nav_h2/', this.loadH2()).subscribe((res: any) => {
          this.loadingNav = true;

          if (res.status == 100) {
            let decryptData = JSON.parse(this.cnf.decryptData(res.datas));

            this.h2 = decryptData[0].fund_daily_nav;
            let h1 = this.h1;
            let h2 = this.h2;
            this.loadMerge(h1, h2);
          }
        });
      });
    });
  }

  loadLinkMenu() {
    return this.http.get('/assets/config/menu.json')
      .map((response: Response) => response);
  }

  loadData() {
    let params = new HttpParams();
    params = params.append('appid', this.cnf.appid);
    params.append('appkey', this.cnf.appkey);
    params = params.append('lang', this.cnf.lang);

    let url = this.cnf.URLWS + '/banner';
    if (this.preview) {
      params = params.append('token', this.previewToken);
      url = url + '/preview/' + this.preview;
    } else {
      url = url + '/frontend/all';
    }

    return this.http.get(url, { params })
      .map((response: Response) => response);
  }

  loadH1() {
    let params = new HttpParams();
    params = params.append('appid', 'test'); params = params.append('appkey', 'on');
    params = params.append('apptype', 'desktop');
    params = params.append('lang', this.cnf.lang);
    params = params.append('attoken', this.attoken);

    return this.http.get(this.cnf.URLWSNonPublicArea + '/fund/daily-nav/h-1/', { params })
      .map((response: Response) => response);
  }

  loadH2() {
    let params = new HttpParams();
    params = params.append('appid', 'test'); params = params.append('appkey', 'on');
    params = params.append('apptype', 'desktop');
    params = params.append('lang', this.cnf.lang);
    params = params.append('attoken', this.attoken);

    return this.http.get(this.cnf.URLWSNonPublicArea + '/fund/daily-nav/h-2/', { params })
      .map((response: Response) => response);
  }

  loadMerge(endDate, startDate) {
    let output = [];

    for (var i in endDate) {
      let dataEndDate = endDate[i];

      for (var i in startDate) {
        let dataStartDate = startDate[i];

        if (dataEndDate.fundName == dataStartDate.fundName) {
          let dataStartDateSplit = dataStartDate.pricingDate.split('-');
          let dataEndDateSplit = dataEndDate.pricingDate.split('-');
          this.dateStart = new Date(parseInt(dataStartDateSplit[0]), parseInt(dataStartDateSplit[1]) - 1, parseInt(dataStartDateSplit[2])); // yy,mm-1,dd
          this.dateEnd = new Date(parseInt(dataEndDateSplit[0]), parseInt(dataEndDateSplit[1]) - 1, parseInt(dataEndDateSplit[2]));

          output.push({
            'fundName': dataEndDate.fundName,
            'pricingDateStart': dataStartDate.pricingDate,
            'pricingDateEnd': dataEndDate.pricingDate,
            'bidPriceDateStart': dataStartDate.bidPrice,
            'bidPriceDateEnd': dataEndDate.bidPrice,
            'moneyCode': dataEndDate.moneyCode,
          })
        }
      }
    }

    this.dailyNavData = this.splitJsonData(output, 3);
  }

  splitJsonData(output, parts: number) {
    let _output = [];
    let x: number = 0;

    for (let i in output) {
      if (Number(i) % parts == 0) {
        x = Number(i) / parts;
        _output.push({
          'data': []
        });
      }

      _output[x]['data'].push(
        output[i]
      );
    }
    return _output;
  }

  onInternalSubmit({ value, valid }: { value: UserInternal, valid: boolean }) {
    this.userInternal = value;
    this.loadingSignin = true;

    let params = new HttpParams();
    params = params.append('appid', this.cnf.appid);
    params = params.append('appkey', this.cnf.appkey);
    let data = {
      'userId': this.userInternal.email,
      'password': this.cnf.md5(this.userInternal.password)
    };

    this.http.post(this.cnf.URLWSNonPublicArea + '/user_frontend/login', data, { params }).subscribe((res: any) => {

      if (res.status == 100) {
        this.userId = res.datas.userId;
        localStorage.setItem("token", res.token);
        localStorage.setItem("userid", res.datas.userId);
        localStorage.setItem("lastLogin", res.datas.lastLogin);
        this.cnf.token = res.token;
        this.cnf.userId = res.datas.userId;
        this.auditTrail.saveLog("Home", "Login");

        this.loadPersonalData().subscribe((res: any) => {
          if (res.status == 100) {
            let decryptData = JSON.parse(this.cnf.decryptData(res.datas));
            this.personalData = decryptData[0].personalData[0];
            localStorage.setItem('userData', this.cnf.encryptData(JSON.stringify(this.personalData)));
          }

          this.loadingSignin = false;
          this.router.navigate(['/dashboard']);
        });
      } else {
        this.loadingSignin = false;
        let oops = this.translate.instant('_oops');
        let message = this.translate.instant(res.message);
        this.swalData = {
          "title": oops,
          "message": message,
          "type": "error"
        };
        this.showSwal();
      }
    });
  }

  loadPersonalData() {
    let params = new HttpParams();
    params = params.append('appid', 'test'); params = params.append('appkey', 'on');
    params = params.append('apptype', 'desktop');
    params = params.append('token', this.cnf.token);
    params = params.append('lang', this.cnf.lang);

    return this.http.get(this.cnf.URLWSNonPublicArea + '/personal_data/data/userid/' + this.userId, { params })
      .map((response: Response) => response);
  }

  loadNotification() {
    let params = new HttpParams();
    params = params.append('appid', 'test');
    params = params.append('appkey', 'on');
    params = params.append('apptype', 'desktop');
    params = params.append('attoken', this.attokenNotification);

    return this.http.get(this.cnf.URLWSNonPublicArea + '/inbox_blast/frontend/notification/' + this.idUser, { params })
      .map((response: Response) => response);
  }

  public myfunc(evt: any) {

  }

  doLogout() {
    var url = this.cnf.URLWSNonPublicArea + '/user_frontend/logout?appid=' + this.cnf.appid + '&appkey=' + this.cnf.appkey + '&token=' + this.cnf.token;
    this.http.get(url).subscribe(res => {
      this.auditTrail.saveLog("Home", "Logout");
      localStorage.clear();
      window.location.reload();
    });
  }

  doLoadBanner(url) {
    if (url) {
      window.open(url);
    }
  }

  showSwal() {
    setTimeout(() => {
      this.swal.show();
    }, 100);
  }
}
