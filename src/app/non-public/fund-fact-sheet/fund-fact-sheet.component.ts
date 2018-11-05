import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Config } from '../../config'; 
import { AuditTrail } from './../../audit-trail';
import { Title } from '@angular/platform-browser';
import { CacheService } from '../../cache.service';
import * as CryptoJS from 'crypto-js';
import { Location } from '@angular/common';

@Component({
  selector: 'app-fund-fact-sheet',
  templateUrl: './fund-fact-sheet.component.html',
  styleUrls: ['./fund-fact-sheet.component.scss'],
	providers: [ Config, AuditTrail ]
})
export class FundFactsheetComponent implements OnInit {
  page = 4;
  params : any;
  fundNameData: any;
  public loadingData : boolean = false;
  public userId: any = '';
  attoken: string = '';
  projectName: string = 'fund';

  constructor(private route: ActivatedRoute, private cnf: Config, private auditTrail: AuditTrail, private titleService: Title, private http: HttpClient, private cacheService: CacheService, private _location: Location) {
    this.route.params.subscribe( params => this.params = params );
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
    this.auditTrail.saveLog("Fund Fund & Fact Sheet","Open");
    this.titleService.setTitle( this.cnf.prefixTitle + "Fund Fact Sheet" + this.cnf.postfixTitle );

    this.userId = localStorage.getItem('userid');

    this.cnf.getAttoken().subscribe((res: any) => {
      if (res.status == 100) {
        this.attoken = this.cnf.generateAttoken(this.projectName, res.datas);
      }

      this.cacheService.get(this.cnf.lang + '/fund_name/', this.loadFundName()).subscribe((res:any) => {
        if (res.status == 100) {
          let decryptData = JSON.parse( this.cnf.decryptData( res.datas ) );

          this.fundNameData = decryptData[0].fund_fact_name;
          this.loadingData = true;
        }
      });
    });
  }

  doDownloadFile(obj){
    this.auditTrail.saveLog("Fund Fund & Fact Sheet","Download Fund " + this.cnf.postfixTitle)
    let url = this.cnf.URLWSNonPublicArea + '/file_transfer/fund-fact-sheet/' + obj + '?appid=test&apptype=web&token='+ this.cnf.token +'&lang=id';;
    window.open(url, 'Download'); 
  }

  loadFundName(){
    let params = new HttpParams();
    params = params.append('appid', 'test'); params = params.append('appkey', 'on');
    params = params.append('apptype', 'desktop');
    params = params.append('token', this.cnf.token);
    params = params.append('lang', this.cnf.lang);
    params = params.append('attoken', this.attoken);

    return this.http.get( this.cnf.URLWSNonPublicArea + '/fund/fund-name/', {params} )
      .map((response: Response) => response);
  }

  backClicked() {
    this._location.back();
  }

}
