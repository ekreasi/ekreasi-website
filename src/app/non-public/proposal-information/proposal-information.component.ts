import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Config } from '../../config';
import { AuditTrail } from './../../audit-trail';
import { Title } from '@angular/platform-browser';
import { CacheService } from '../../cache.service';

@Component({
  selector: 'app-proposal-information',
  templateUrl: './proposal-information.component.html',
  styleUrls: ['./proposal-information.component.scss'],
  providers: [Config, AuditTrail]
})
export class ProposalInformationComponent implements OnInit {
  public data: any = {};
  public userId: any = '';
  public loadingData: boolean = false;
  page = 4;
  proposalData: any = [];

  // paging
  currentPage: any = 1;
  perPage: any = 10;
  totalPages: any = 1;
  total: any = 0;
  totalDataPagination: any = 1;
  previousPage: any = 1;

  constructor(private cnf: Config, private auditTrail: AuditTrail, private titleService: Title, private http: HttpClient, private cacheService: CacheService, private _location: Location) {

  }

  ngOnInit() {
    this.auditTrail.saveLog("My Data Proposal Information", "Proposal Information" + this.cnf.postfixTitle)
    this.titleService.setTitle(this.cnf.prefixTitle + "Proposal Information" + this.cnf.postfixTitle);

    this.userId = localStorage.getItem('userid');
    this.loadData().subscribe((res: any) => {
      this.loadingData = true;

      if (res.status == 100) {
        let decryptData = JSON.parse(this.cnf.decryptData(res.datas));
        this.proposalData = decryptData[0].proposalInformation_header;

        this.total = decryptData[0].total;
        this.totalDataPagination = decryptData[0].total;
        this.totalPages = decryptData[0].total_page;
      }
    });
  }

  loadPage(page: string) {
    if (page != this.previousPage) {
      this.loadingData = false;
      this.previousPage = page;
      this.currentPage = page;

      this.loadData().subscribe((res: any) => {
        if (res.status == 100) {
          let decryptData = JSON.parse(this.cnf.decryptData(res.datas));
          this.proposalData = decryptData[0].proposalInformation_header;
          this.loadingData = true;

          this.total = decryptData[0].total;
          this.totalDataPagination = decryptData[0].total;
          this.totalPages = decryptData[0].total_page;
        }
      });
    }
  }

  loadData() {
    let params = new HttpParams();
    params = params.append('appid', 'test'); params = params.append('appkey', 'on');
    params = params.append('apptype', 'desktop');
    params = params.append('token', this.cnf.token);
    params = params.append('lang', this.cnf.lang);
    params = params.append('page', this.currentPage);
    params = params.append('per_page', this.perPage);

    return this.http.get(this.cnf.URLWSNonPublicArea + '/proposal_information/header/userid/' + this.userId, { params })
      .map((response: Response) => response);
  }

  backClicked() {
    this._location.back();
  }

}
