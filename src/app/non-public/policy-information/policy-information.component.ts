import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Config } from '../../config'; 
import { AuditTrail } from './../../audit-trail';
import { Title } from '@angular/platform-browser';
import { CacheService } from '../../cache.service';

@Component({
  selector: 'app-policy-information',
  templateUrl: './policy-information.component.html',
  styleUrls: ['./policy-information.component.scss'],
	providers: [ Config, AuditTrail ]
})
export class PolicyInformationComponent implements OnInit {
  public userId: any = '';
  page = 1;
  policyData : any = [];
  public loadingData : boolean = false;

  // paging
  currentPage: any = 1;
  perPage: any = 10;
  totalPages: any = 1;
  total: any = 0;
  totalDataPagination: any = 1;
  previousPage: any = 1;

  constructor(private cnf: Config, private auditTrail: AuditTrail, private titleService: Title, private http: HttpClient, private cacheService: CacheService, private _location: Location ) {

  }

  ngOnInit() {
    this.auditTrail.saveLog("My Data Policy Information","Open");
    this.titleService.setTitle( this.cnf.prefixTitle + "Policy Information" + this.cnf.postfixTitle );

    this.userId = localStorage.getItem('userid');
    this.loadData().subscribe((res:any) => {
      this.loadingData = true;
      
      if( res.status == 100 ) {
        let decryptData = JSON.parse(this.cnf.decryptData(res.datas));
        this.policyData = decryptData[0].policyInformation_header;

        this.total = decryptData[0].total;
        this.totalDataPagination = decryptData[0].total;
        this.totalPages = decryptData[0].total_page;
      }
    });
  }

  loadPage(page: string) {
    if (page !== this.previousPage) {
      this.previousPage = page;
      this.currentPage = page;

      this.loadData().subscribe((res:any) => {
        let decryptData = JSON.parse(this.cnf.decryptData(res.datas));
        this.policyData = decryptData[0].policyInformation_header;
        this.loadingData = true;
        
        this.total = decryptData[0].total;
        this.totalDataPagination = decryptData[0].total;
        this.totalPages = decryptData[0].total_page;
      });
    }
  }

  loadData(){
    let params = new HttpParams();
    params = params.append('appid', 'test'); params = params.append('appkey', 'on');
    params = params.append('apptype', 'desktop');
    params = params.append('token', this.cnf.token);
    params = params.append('lang', this.cnf.lang);
    params = params.append('page', this.currentPage);
    params = params.append('per_page', this.perPage);

    return this.http.get( this.cnf.URLWSNonPublicArea + '/policy_information/header/userid/' + this.userId, {params} )
      .map((response: Response) => response);
  }

  backClicked() {
    this._location.back();
  }

}
