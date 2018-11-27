import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { HttpClient, HttpParams } from "@angular/common/http";
import { ActivatedRoute, Router } from "@angular/router";
import { Config } from '../../config'; 
import { AuditTrail } from './../../audit-trail';
import { Title } from '@angular/platform-browser';
import { CacheService } from '../../cache.service';
import { NgbDateFRParserFormatter } from "../../ngb-date-fr-parser-formatter"
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-tracking',
  templateUrl: './tracking.component.html',
  styleUrls: ['./tracking.component.scss'],
  providers: [ Config, AuditTrail, { provide: NgbDateParserFormatter, useClass: NgbDateFRParserFormatter }]
})
export class TrackingComponent implements OnInit {
  params: any = '';
  userId: any = '';
  page = 1;
  policyData: any = [];
  claimReimbursementData: any = [];
  claimCashlessData: any = [];

  modelPolicyNoCashless: any = "";
  modelPolicyNoReimbursement: any = "";

  // loading data
  loadingData: boolean = false;
  loadingDataCashless: boolean = false;
  loadingDataReimbursement: boolean = false;

  // paging reimbursement
  reimbursementCurrentPage: any = 1;
  reimbursementPerPage: any = 10;
  reimbursementTotalPages: any = 1;
  reimbursementTotal: any = 0;
  reimbursementTotalDataPagination: any = 1;
  reimbursementPreviousPage: any = 1;

  // paging cashless
  cashlessCurrentPage: any = 1;
  cashlessPerPage: any = 10;
  cashlessTotalPages: any = 1;
  cashlessTotal: any = 0;
  cashlessTotalDataPagination: any = 1;
  cashlessPreviousPage: any = 1;

  constructor(private cnf: Config, private auditTrail: AuditTrail, private titleService: Title, private router: Router, private http: HttpClient, private cacheService: CacheService, private _location: Location ) {

  }

  ngOnInit() {
    this.auditTrail.saveLog("Claim Tracking","Open");
    this.titleService.setTitle( this.cnf.prefixTitle + "Tracking" + this.cnf.postfixTitle );

    this.userId = localStorage.getItem('userid');

    this.loadPolicy().subscribe((res: any) => {
      this.loadingData = true;
      if (res.status == 100) {
        this.policyData = res.datas[0].policyInformation_header;

        this.loadClaimReimbursement().subscribe((res: any) => {
          this.loadingDataReimbursement = true;
          if (res.status == 100) {
            this.claimReimbursementData = res.datas[0].claim_header;
            this.reimbursementTotal = res.datas[0].total;
            this.reimbursementTotalDataPagination = res.datas[0].total;
            this.reimbursementTotalPages = res.datas[0].total_page;
          }
        });

        this.loadClaimCashless().subscribe((res: any) => {
          this.loadingDataCashless = true;
          if (res.status == 100) {
            this.claimCashlessData = res.datas[0].claim_aai;
            this.cashlessTotal = res.datas[0].total;
            this.cashlessTotalDataPagination = res.datas[0].total;
            this.cashlessTotalPages = res.datas[0].total_page;
          }
        });
      }
    });
  }

  loadCashlessDetail(data) {
    localStorage.setItem("cashlessTempData", JSON.stringify(data));
    this.router.navigate(['/cashless-tracking-detail', data.claim_id]);
  }

  doSearchCashless() {
    this.auditTrail.saveLog("Claim Tracking","Search CashLess");
    this.loadingDataCashless = false;

    this.cashlessPreviousPage = 1;
    this.cashlessCurrentPage = 1;
    this.claimCashlessData = [];

    this.loadClaimCashless().subscribe((res: any) => {
      this.loadingDataCashless = true;
      this.claimCashlessData = res.datas[0].claim_aai;
      this.cashlessTotal = res.datas[0].total;
      this.cashlessTotalPages = res.datas[0].total_page;
    });
  }

  loadPageReimbursement(page: string) {
    if (page !== this.reimbursementPreviousPage) {
      this.loadingDataReimbursement = false;

      this.reimbursementPreviousPage = page;
      this.reimbursementCurrentPage = page;

      this.loadClaimReimbursement().subscribe((res: any) => {
        this.loadingDataReimbursement = true;
        if (res.status == 100) {
          this.claimReimbursementData = res.datas[0].claim_header;
          this.reimbursementTotal = res.datas[0].total;
          this.reimbursementTotalPages = res.datas[0].total_page;
        }
      });
    }
  }

  loadPageCashless(page: string) {
    if (page !== this.cashlessPreviousPage) {
      this.loadingDataCashless = false;

      this.cashlessPreviousPage = page;
      this.cashlessCurrentPage = page;
      this.claimCashlessData = [];

      this.loadClaimCashless().subscribe((res: any) => {
        this.loadingDataCashless = true;
        if (res.status == 100) {
          this.claimCashlessData = res.datas[0].claim_aai;
          this.cashlessTotal = res.datas[0].total;
          this.cashlessTotalPages = res.datas[0].total_page;
        }
      });
    }
  }

  loadPolicy() {
    let params = new HttpParams();
    params = params.append('appid', 'test'); params = params.append('appkey', 'on');
    params = params.append('apptype', 'desktop');
    params = params.append('token', this.cnf.token);
    params = params.append('lang', this.cnf.lang);
    params = params.append('page', '1');
    params = params.append('per_page', '100');

    return this.http.get(this.cnf.URLWSNonPublicArea + '/policy_information/header/userid/' + this.userId, { params })
      .map((response: Response) => response);
  }

  loadClaimReimbursement() {
    let params = new HttpParams();
    params = params.append('appid', 'test');
    params = params.append('appkey', 'on');
    params = params.append('apptype', 'desktop');
    params = params.append('token', this.cnf.token);
    params = params.append('lang', this.cnf.lang);
    params = params.append('page', this.reimbursementCurrentPage);
    params = params.append('per_page', this.reimbursementPerPage);


    return this.http.get(this.cnf.URLWSNonPublicArea + '/claim/header/reimbursement/tracking/' + this.userId, { params })
      .map((response: Response) => response);
  }

  loadClaimCashless() {
    let modelStartCashless = '';
    if (this.modelStartCashless) {
      modelStartCashless = this.modelStartCashless.year + '-' + ('0' + this.modelStartCashless.month).slice(-2) + '-' + ('0' + this.modelStartCashless.day).slice(-2);
    }

    let params = new HttpParams();
    params = params.append('appid', 'test');
    params = params.append('appkey', 'on');
    params = params.append('apptype', 'desktop');
    params = params.append('token', this.cnf.token);
    params = params.append('lang', this.cnf.lang);
    params = params.append('page', this.cashlessCurrentPage);
    params = params.append('per_page', this.cashlessPerPage);
    params = params.append('userid', this.userId);
    params = params.append('policyno', this.modelPolicyNoCashless);
    params = params.append('admissiondate', modelStartCashless);

    return this.http.get(this.cnf.URLWSNonPublicArea + '/claim/aai/all/', { params })
      .map((response: Response) => response);
  }

  doSearchReimbursement() {
    this.auditTrail.saveLog("Claim Tracking","Search Reimbursement");
    this.claimReimbursementData = [];
    this.reimbursementCurrentPage = 1;

    this.loadClaimReimbursement().subscribe((res: any) => {
      this.claimReimbursementData = res.datas[0].claim_header;
      this.loadingData = true;
    });
  }

  backClicked() {
    this._location.back();
  }
  
  modelStartCashless;
  modelStartReimbursement;
  modelEndReimbursement;

  valuedate = new Date();
}
