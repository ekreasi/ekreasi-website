import { Component, OnInit, Input } from '@angular/core';
import { NgxCarousel } from 'ngx-carousel';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CacheService } from '../../cache.service';
import * as CryptoJS from 'crypto-js';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Config } from '../../config';
import { AuditTrail } from './../../audit-trail';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [Config, AuditTrail]
})

export class DashboardComponent implements OnInit {
  public carouselOne: NgxCarousel;
  public dataCarousel: any = [];
  public data: any;
  public loadingBanner: boolean = false;

  public policySummaryData: any = [];
  public topGlobalFundUseridData: any = [];
  public topGlobalFundChubbLifeData: any = [];

  public loadingDataPolicy: boolean = false;
  public loadingData: boolean = false;
  public loadingDataYourTop3Funds: boolean = false;
  public loadingDataChubbLifeTop3Funds: boolean = false;
  public userId: any = '';
  public preview: any = '';
  public previewToken: any;
  public bannerBorderColor: any = 'banner-br-orange';
  attoken: string = '';
  projectName: string = 'fund';

  constructor(
    private cnf: Config, private auditTrail: AuditTrail, private titleService: Title,
    private http: HttpClient,
    private cacheService: CacheService,
    private router: Router,
    private translate: TranslateService,
    private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      this.preview = params['preview'];
      this.previewToken = params['token'];
    });

    let colors = ['banner-br-blue','banner-br-orange','banner-br-tosca','banner-br-red','banner-br-green','banner-br-magenta'];
    this.bannerBorderColor = colors[Math.floor(Math.random() * colors.length)];
  }

  ngOnInit() {
    this.auditTrail.saveLog("Dashboard", "Open");
    this.titleService.setTitle(this.cnf.prefixTitle + "Dashboard" + this.cnf.postfixTitle);

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
    };

    this.userId = localStorage.getItem('userid');
    this.cnf.getAttoken().subscribe((res: any) => {
      if (res.status == 100) {
        this.attoken = this.cnf.generateAttoken(this.projectName, res.datas);
      }
        this.loadPolicySummary().subscribe((res: any) => {
          if (res.status == 100) {
            let decryptData = JSON.parse(this.cnf.decryptData(res.datas));
            this.policySummaryData = decryptData[0].policyInformation_header;
          }
          this.loadingDataPolicy = true;
        });

        this.loadTopGlobalFundUserid().subscribe((res: any) => {
          if (res.status == 100) {
            let decryptData = JSON.parse(this.cnf.decryptData(res.datas));
            this.topGlobalFundUseridData = decryptData[0].fund;
          }
          this.loadingDataYourTop3Funds = true;
        });

        this.loadTopGlobalFundChubbLife().subscribe((res: any) => {
          if (res.status == 100) {
            let decryptData = JSON.parse(this.cnf.decryptData(res.datas));
            this.topGlobalFundChubbLifeData = decryptData[0].fund;
          }
          this.loadingDataChubbLifeTop3Funds = true;
        });
      });

    this.data = this.cacheService.get(this.cnf.lang + '/segmented_banner', this.loadData()).subscribe((res: any) => {
      this.loadingBanner = true;
      if (res.status == 100) {
        for( let i in res.datas ) {
          let dataTemp = res.datas[i];
          dataTemp.description = this.cnf.strip_tags(dataTemp.description, [dataTemp.description, "b", "i", "u"]);
          dataTemp.showTextSection = false;
          this.dataCarousel.push(dataTemp);
        }
      }
    });
  }

  doLoadBanner(url){
    if(url){
      window.open(url);
    }
  }

  loadTopGlobalFundUserid() {
    let params = new HttpParams();
    params = params.append('appid', 'test'); params = params.append('appkey', 'on');
    params = params.append('apptype', 'desktop');
    params = params.append('token', this.cnf.token);
    params = params.append('lang', this.cnf.lang);
    params = params.append('attoken', this.attoken);

    return this.http.get(this.cnf.URLWSNonPublicArea + '/fund/top-global-fund/userid/' + this.userId, { params })
      .map((response: Response) => response);
  }

  loadTopGlobalFundChubbLife() {
    let params = new HttpParams();
    params = params.append('appid', 'test'); params = params.append('appkey', 'on');
    params = params.append('apptype', 'desktop');
    params = params.append('token', this.cnf.token);
    params = params.append('lang', this.cnf.lang);
    params = params.append('attoken', this.attoken);

    return this.http.get(this.cnf.URLWSNonPublicArea + '/fund/dashboard/top-global-fund/', { params })
      .map((response: Response) => response);
  }

  loadPolicySummary() {
    let params = new HttpParams();
    params = params.append('appid', 'test'); params = params.append('appkey', 'on');
    params = params.append('apptype', 'desktop');
    params = params.append('token', this.cnf.token);
    params = params.append('lang', this.cnf.lang);

    return this.http.get(this.cnf.URLWSNonPublicArea + '/policy_information/header/policy/dashboard/' + this.userId, { params })
      .map((response: Response) => response);
  }

  loadData() {
    let params = new HttpParams();
    params = params.append('appid', this.cnf.appid);
    params.append('appkey', this.cnf.appkey);
    params = params.append('lang', this.cnf.lang);

    let url = this.cnf.URLWS + '/segmented_banner';
    if (this.preview) {
      params = params.append('token', this.previewToken);
      url = url + '/preview/' + this.preview;
    } else {
      url = url + '/frontend/all';
    }

    return this.http.get(url, { params })
      .map((response: Response) => response);
  }

  showSlideText( carousel ) {
    carousel.showTextSection = true;
  }

  hideSlideText( carousel ) {
    carousel.showTextSection = false;
  }
}
