import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Config } from '../../config'; 
import { AuditTrail } from './../../audit-trail';
import { Title } from '@angular/platform-browser';
import { CacheService } from '../../cache.service';

@Component({
  selector: 'app-personal-data',
  templateUrl: './personal-data.component.html',
  styleUrls: ['./personal-data.component.scss'],
	providers: [ Config, AuditTrail ]
})
export class PersonalDataComponent implements OnInit {
  public data : any = {};
  public userId: any = '';
  
  constructor(private cnf: Config, private auditTrail: AuditTrail, private titleService: Title, private http: HttpClient, private cacheService: CacheService, private _location: Location ) {

  }

  ngOnInit() {
    this.auditTrail.saveLog("My Data Personal Infromation", "Open");
    this.titleService.setTitle( this.cnf.prefixTitle + "Personal Data" + this.cnf.postfixTitle );

    this.userId = localStorage.getItem('userid');
    this.data = JSON.parse( this.cnf.decryptData( localStorage.getItem('userData') ) );
    
    if( !this.data.homeAddress1 ){
      this.data.homeAddress1 = this.data.correspondenceAddress1;
      this.data.homeAddress2 = this.data.correspondenceAddress2;
      this.data.homeAddress3 = this.data.correspondenceAddress3;
      this.data.homeAddress4 = this.data.correspondenceAddress4;
      this.data.homeAddress5 = this.data.correspondenceAddress5;
      this.data.homeAddress6 = this.data.correspondenceAddress6;
      this.data.homeAddress7 = this.data.correspondenceAddress7;
      this.data.homeState = this.data.correspondenceState;
      this.data.homePostCode = this.data.correspondencePostCode;
    } else if( !this.data.officeAddress1 ){
      this.data.officeAddress1 = this.data.correspondenceAddress1;
      this.data.officeAddress2 = this.data.correspondenceAddress2;
      this.data.officeAddress3 = this.data.correspondenceAddress3;
      this.data.officeAddress4 = this.data.correspondenceAddress4;
      this.data.officeAddress5 = this.data.correspondenceAddress5;
      this.data.officeAddress6 = this.data.correspondenceAddress6;
      this.data.officeAddress7 = this.data.correspondenceAddress7;
      this.data.officeState = this.data.correspondenceState;
      this.data.officePostCode = this.data.correspondencePostCode;
    }

    // DEPRECATED USING LOCALSTORAGE 
    // this.loadData().subscribe((res:any) => {
    //   this.data = res.datas[0].personalData[0];
    //   localStorage.setItem('userData', JSON.stringify(this.data));
    // });
  }

  loadData(){
    let params = new HttpParams();
    params = params.append('appid', 'test'); params = params.append('appkey', 'on');
    params = params.append('apptype', 'desktop');
    params = params.append('token', this.cnf.token);
    // params.append('appkey', this.cnf.appkey);
    params = params.append('lang', this.cnf.lang);

    return this.http.get( this.cnf.URLWSNonPublicArea + '/personal_data/data/userid/' + this.userId, {params} )
      .map((response: Response) => response);
  }
  
  backClicked() {
    this._location.back();
  }

}
