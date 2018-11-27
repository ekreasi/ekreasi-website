import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Config } from '../../config'; 
import { AuditTrail } from './../../audit-trail';
import { Title } from '@angular/platform-browser';
import { CacheService } from '../../cache.service';
import { forEach } from '@angular/router/src/utils/collection';
import * as CryptoJS from 'crypto-js';
import { OrderPipe } from 'ngx-order-pipe';

@Component({
  selector: 'app-daily-nav',
  templateUrl: './daily-nav.component.html',
  styleUrls: ['./daily-nav.component.scss'],
	providers: [ Config, AuditTrail ]
})
export class DailyNavComponent implements OnInit {
  page = 4;
  params : any;
  fundNameData: any = [];
  h1: any = [];
  h2: any = [];
  dailyNavData: any = [];
  percentage: any;
  dateStart: any;
  dateEnd: any;
  modelStart;
  modelEnd;
  modelFundName;
  public loadingData : boolean = false;
  public userId: any = '';
  order: string = 'percentage';
  reverse: boolean = false;
  attoken: string = '';
  projectName: string = 'fund';

  constructor( private route: ActivatedRoute, private cnf: Config, private auditTrail: AuditTrail, private titleService: Title, private http:HttpClient, private cacheService: CacheService, private orderPipe: OrderPipe ) {
    // this.route.params.subscribe( params => this.params = params );
  }

  decryptData( encryptData ){
    let decodeString = atob(encryptData);

    let key = CryptoJS.enc.Utf8.parse( this.cnf.encryptKey );
    let decrypted = CryptoJS.AES.decrypt(decodeString, key,
    {
        keySize: 128 / 8,
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
    }).toString(CryptoJS.enc.Utf8);

    let decryptData = JSON.parse(decrypted);

    return decryptData;
  }

  ngOnInit() {
    this.titleService.setTitle( this.cnf.prefixTitle + 'Daily NAV' + this.cnf.postfixTitle );

    this.userId = localStorage.getItem('userid');

    this.cnf.getAttoken().subscribe((res: any) => {
      if (res.status == 100) {
        this.attoken = this.cnf.generateAttoken(this.projectName, res.datas);
      }

    this.cacheService.get(this.cnf.lang + '/fund_name/', this.loadFundName()).subscribe((res:any) => {
      let decryptData = JSON.parse( this.cnf.decryptData( res.datas ) );

      this.fundNameData = decryptData[0].fund_fact_name;
      this.loadingData = true;
    });

    this.cacheService.get(this.cnf.lang + '/fund_daily_nav_h1/', this.loadH1()).subscribe((res:any) => {
      let decryptData = JSON.parse( this.cnf.decryptData( res.datas ) );

      this.h1 = decryptData[0].fund_daily_nav;

      this.cacheService.get(this.cnf.lang + '/fund_daily_nav_h2/', this.loadH2()).subscribe((res:any) => {
        let decryptData = JSON.parse( this.cnf.decryptData( res.datas ) );

        this.h2 = decryptData[0].fund_daily_nav;
        let h1 = this.h1;
        let h2 = this.h2;
        this.loadMerge(h1, h2);
      });
    });
   });
  }

  loadFundName(){
    let params = new HttpParams();
    params = params.append('appid', 'test'); params = params.append('appkey', 'on');
    params = params.append('apptype', 'desktop');
    params = params.append('token', 'iCtY4w931XkJ0bwI7Adf');
    params = params.append('lang', this.cnf.lang);
    params = params.append('attoken', this.attoken);

    return this.http.get( this.cnf.URLWSNonPublicArea + '/fund/fund-name/', {params} )
      .map((response: Response) => response);
  }

  loadH1(){
    let params = new HttpParams();
    params = params.append('appid', 'test'); params = params.append('appkey', 'on');
    params = params.append('apptype', 'desktop');
    params = params.append('token', 'iCtY4w931XkJ0bwI7Adf');
    params = params.append('lang', this.cnf.lang);
    params = params.append('attoken', this.attoken);

    return this.http.get( this.cnf.URLWSNonPublicArea + '/fund/daily-nav/h-1/', {params} )
      .map((response: Response) => response);
  }

  loadH2(){
    let params = new HttpParams();
    params = params.append('appid', 'test'); params = params.append('appkey', 'on');
    params = params.append('apptype', 'desktop');
    params = params.append('token', 'iCtY4w931XkJ0bwI7Adf');
    params = params.append('lang', this.cnf.lang);
    params = params.append('attoken', this.attoken);

    return this.http.get( this.cnf.URLWSNonPublicArea + '/fund/daily-nav/h-2/', {params} )
      .map((response: Response) => response);
  }

  loadMerge(endDate,startDate){
    let output = [];

    for( var i in endDate ){
      let dataEndDate = endDate[i];

      for( var i in startDate ) {
        let dataStartDate = startDate[i];

        if( dataEndDate.fundName == dataStartDate.fundName ) {
          let dataStartDateSplit = dataStartDate.pricingDate.split('-');
          let dataEndDateSplit = dataEndDate.pricingDate.split('-');
          this.dateStart = new Date( parseInt(dataStartDateSplit[0]), parseInt(dataStartDateSplit[1]) - 1, parseInt(dataStartDateSplit[2]) ); // yy,mm-1,dd
          this.dateEnd = new Date( parseInt(dataEndDateSplit[0]), parseInt(dataEndDateSplit[1]) - 1, parseInt(dataEndDateSplit[2]) );

          let rumus = ((dataEndDate.bidPrice - dataStartDate.bidPrice) / dataStartDate.bidPrice ) * 100;
          let percentageResult = Math.round(rumus * 10000) / 10000;

          output.push({
            'fundName': dataEndDate.fundName,
            'pricingDateStart': dataStartDate.pricingDate,
            'pricingDateEnd': dataEndDate.pricingDate,
            'bidPriceDateStart': Number(dataStartDate.bidPrice),
            'bidPriceDateEnd': Number(dataEndDate.bidPrice),
            'percentage': percentageResult,
            'moneyCode': dataEndDate.moneyCode,
          })
        }
      }
    }

    this.dailyNavData = this.orderPipe.transform(output, 'percentage');
    
  }

  loadDataByDate(startDate,endDate){
    let params = new HttpParams();
    params = params.append('appid', 'test'); params = params.append('appkey', 'on');
    params = params.append('apptype', 'desktop');
    params = params.append('token', 'iCtY4w931XkJ0bwI7Adf');
    params = params.append('lang', this.cnf.lang);
    params = params.append('attoken', this.attoken);

    return this.http.get( this.cnf.URLWSNonPublicArea + '/fund/daily-nav/'+startDate+'/'+endDate, {params} )
      .map((response: Response) => response);
  }
  
  loadMergeSearch(dateStart, dateEnd, results){
    let outputStart = [];
    let outputEnd = [];
    for( var i in results ){
      let result = results[i];
      let dateObj = new Date(result.pricingDate);
      let dateDay = dateObj.getDate();
      let dateMonth = dateObj.getMonth() + 1;
      let dateYear = dateObj.getFullYear();
      let resultDate = dateYear+'-'+dateMonth+'-'+dateDay;

      if(resultDate == dateStart){

      }
    }
  }

  setOrder(value: string) {
    if (this.order === value) {
      this.reverse = !this.reverse;
    }

    this.order = value;
  }

  valuedate = new Date();
}
