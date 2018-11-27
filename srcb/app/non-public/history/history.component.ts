import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Config } from '../../config';
import { AuditTrail } from './../../audit-trail';
import { Title } from '@angular/platform-browser';
import { CacheService } from '../../cache.service';
import { SwalComponent } from '@toverux/ngx-sweetalert2';
import { Location } from '@angular/common';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { NgbDateFRParserFormatter } from '../../ngb-date-fr-parser-formatter';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
  providers: [Config, AuditTrail, { provide: NgbDateParserFormatter, useClass: NgbDateFRParserFormatter }]
})
export class HistoryComponent implements OnInit {
  @ViewChild('SessionExpired') private loginErrorSwal: SwalComponent;

  public data: any = {};
  public userId: any = '';
  public loadingData: boolean = false;
  page = 1;
  historyData: any = [];
  firstLoading: boolean = false;

  policyData: any = [];
  statusClaimData: any = [];
  modelPolicyNo: any = "";
  modelStatus: any = "";

  // paging
  historyCurrentPage: any = 1;
  historyPerPage: any = 10;
  historyTotalPages: any = 1;
  historyTotal: any = 0;
  historyTotalDataPagination: any = 1;
  historyPreviousPage: any = 1;
  modelStartHistory: any;

  constructor(private cnf: Config, private auditTrail: AuditTrail, private titleService: Title, private http: HttpClient, private cacheService: CacheService, private _location: Location) {

  }

  ngOnInit() {
    this.auditTrail.saveLog("Claim History", "Open");
    this.titleService.setTitle(this.cnf.prefixTitle + "History" + this.cnf.postfixTitle);

    this.userId = localStorage.getItem('userid');

    this.doGetSearch();
    this.loadPolicy().subscribe((res: any) => {
      if (res.status == 100) {
        let decryptData = JSON.parse(this.cnf.decryptData(res.datas));
        this.policyData = decryptData[0].policyInformation_header;
      }
    });

    this.loadStatusClaim().subscribe((res: any) => {
      if (res.status == 100) {
        let datas = res.datas[0].claim_status;

        let dataOutput = [];
        for (let i in datas) {
          let dataTemp = datas[i];
          if (dataTemp.indexOf('+') !== -1) {
            dataTemp = dataTemp.replace('+', '');
            this.modelStatus = dataTemp;
          }
          dataOutput.push(dataTemp);
        }
        this.statusClaimData = dataOutput;
      }

      this.loadHistory().subscribe((res: any) => {
        this.firstLoading = true;
        this.loadingData = true;
        if (res.status == 100) {
          this.historyData = res.datas[0].claim_header;

          this.historyTotal = res.datas[0].total;
          this.historyTotalDataPagination = res.datas[0].total;
          this.historyTotalPages = res.datas[0].total_page;
        } else {
          this.historyData = [];
          this.historyTotal = 0;
          this.historyTotalPages = 0;
          this.historyTotalDataPagination = 1;
        }
      });
    });
  }

  doSearchHistory() {
    this.auditTrail.saveLog("Claim Tracking", "Search History");
    this.loadingData = false;

    this.historyPreviousPage = 1;
    this.historyCurrentPage = 1;
    this.historyData = [];
    this.doSaveSearch();

    this.loadHistory().subscribe((res: any) => {
      this.loadingData = true;
      if (res.status == 100) {
        this.historyData = res.datas[0].claim_header;
        this.historyTotal = res.datas[0].total;
        this.historyTotalPages = res.datas[0].total_page;
      } else {
        this.historyData = [];
        this.historyTotal = 0;
        this.historyTotalPages = 0;
        this.historyTotalDataPagination = 1;
      }
    });
  }

  doSaveSearch() {
    localStorage.setItem("history_modelPolicyNo", this.modelPolicyNo);
    localStorage.setItem("history_modelStartHistory", JSON.stringify(this.modelStartHistory));
    localStorage.setItem("history_modelStatus", this.modelStatus);
  }

  doGetSearch() {
    this.modelPolicyNo = ( localStorage.getItem("history_modelPolicyNo") ? localStorage.getItem("history_modelPolicyNo") : '' );
    this.modelStartHistory = ( localStorage.getItem("history_modelStartHistory") && localStorage.getItem("history_modelStartHistory") != "" ? JSON.parse(localStorage.getItem("history_modelStartHistory")) : '' );
    this.modelStatus = ( localStorage.getItem("history_modelStatus") ? localStorage.getItem("history_modelStatus") : '' );
  }

  loadPage(page: string) {
    if (page !== this.historyPreviousPage) {
      this.loadingData = false;
      this.historyData = [];

      this.historyPreviousPage = page;
      this.historyCurrentPage = page;

      this.loadHistory().subscribe((res: any) => {
        this.loadingData = true;
        if (res.status == 100) {
          this.historyData = res.datas[0].claim_header;
        } else {
          this.historyData = [];
          this.historyTotal = 0;
          this.historyTotalPages = 0;
          this.historyTotalDataPagination = 1;
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

  loadStatusClaim() {
    let params = new HttpParams();
    params = params.append('appid', 'test'); params = params.append('appkey', 'on');
    params = params.append('apptype', 'desktop');
    params = params.append('token', this.cnf.token);
    params = params.append('lang', this.cnf.lang);
    params = params.append('page', '1');
    params = params.append('per_page', '100');

    return this.http.get(this.cnf.URLWSNonPublicArea + '/claim/header/allstatusclaim/' + this.userId, { params })
      .map((response: Response) => response);
  }

  loadHistory() {
    let modelStartHistory = '';
    if (this.modelStartHistory) {
      modelStartHistory = this.modelStartHistory.year + '-' + ('0' + this.modelStartHistory.month).slice(-2) + '-' + ('0' + this.modelStartHistory.day).slice(-2);
    }

    let params = new HttpParams();
    params = params.append('appid', 'test');
    params = params.append('appkey', 'on');
    params = params.append('apptype', 'desktop');
    params = params.append('token', this.cnf.token);
    params = params.append('lang', this.cnf.lang);
    params = params.append('page', this.historyCurrentPage);
    params = params.append('per_page', this.historyPerPage);
    params = params.append('policyno', this.modelPolicyNo);
    params = params.append('admissiondate', modelStartHistory);
    params = params.append('status', this.modelStatus);

    return this.http.get(this.cnf.URLWSNonPublicArea + '/claim/header/claim/' + this.userId, { params })
      .map((response: Response) => response);
  }

  backClicked() {
    this._location.back();
  }

  doResetFilter() {
    this.modelPolicyNo = '';
    this.modelStartHistory = '';
    this.modelStatus = '';

    this.doSearchHistory();
  }

}
