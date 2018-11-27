import { NgbDateFRParserFormatter } from './../../ngb-date-fr-parser-formatter';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Config } from '../../config';
import { AuditTrail } from './../../audit-trail';
import { Title } from '@angular/platform-browser';
import { CacheService } from '../../cache.service';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-policy-detail',
  templateUrl: './policy-detail.component.html',
  styleUrls: ['./policy-detail.component.scss'],
  providers: [Config, AuditTrail, { provide: NgbDateParserFormatter, useClass: NgbDateFRParserFormatter }]
})
export class PolicyDetailComponent implements OnInit {
  params: any = '';
  page = 1;
  policyDetailData: any = {};
  policyInvestmentData: any = [];
  policyProductData: any = [];
  policyRiderData: any = [];
  policyBeneficiaryData: any = [];
  policyPaymentData: any = [];
  policyTransactionData: any = [];
  policyEStatementData: any = [];
  policyEStatementYearData: any = [];
  policyEStatementTIVData: any = [];
  policyAgentData: any = {};
  startDate: any = '';

  // paging policy payment data
  paymentCurrentPage: any = 1;
  paymentPerPage: any = 10;
  paymentTotalPages: any = 1;
  paymentTotal: any = 0;
  paymentTotalDataPagination: any = 1;
  paymentPreviousPage: any = 1;

  // paging policy transaction data
  transactionCurrentPage: any = 1;
  transactionPerPage: any = 10;
  transactionTotalPages: any = 1;
  transactionTotal: any = 0;
  transactionTotalDataPagination: any = 1;
  transactionPreviousPage: any = 1;

  // paging policy estatement data
  estatementCurrentPage: any = 1;
  estatementPerPage: any = 10;
  estatementTotalPages: any = 1;
  estatementTotal: any = 0;
  estatementTotalDataPagination: any = 1;
  estatementPreviousPage: any = 1;

  public loadingData: boolean = false;
  public userId: any = '';

  constructor(private route: ActivatedRoute, private cnf: Config, private auditTrail: AuditTrail, private titleService: Title, private router: Router, private http: HttpClient, private cacheService: CacheService, private _location: Location) {
    this.route.params.subscribe(params => this.params = params);
  }

  ngOnInit() {
    this.auditTrail.saveLog("My Data Policy Information", "Policy Detail #" + this.params.policyNo);
    this.titleService.setTitle(this.cnf.prefixTitle + "Policy Detail #" + this.params.policyNo + this.cnf.postfixTitle);

    this.userId = localStorage.getItem('userid');
    this.policyDetail().subscribe((res: any) => {
      if (res.status == 100) {
        let decryptData = JSON.parse(this.cnf.decryptData(res.datas));
        this.policyDetailData = decryptData[0].policyInformation_detail[0];
        this.loadingData = true;

        if (!this.policyDetailData.homeAddress1) {
          this.policyDetailData.homeAddress1 = this.policyDetailData.correspondenceAddress1;
          this.policyDetailData.homeAddress2 = this.policyDetailData.correspondenceAddress2;
          this.policyDetailData.homeAddress3 = this.policyDetailData.correspondenceAddress3;
          this.policyDetailData.homeAddress4 = this.policyDetailData.correspondenceAddress4;
          this.policyDetailData.homeAddress5 = this.policyDetailData.correspondenceAddress5;
          this.policyDetailData.homeAddress6 = this.policyDetailData.correspondenceAddress6;
          this.policyDetailData.homeAddress7 = this.policyDetailData.correspondenceAddress7;
          this.policyDetailData.homeState = this.policyDetailData.correspondenceState;
          this.policyDetailData.homePostCode = this.policyDetailData.correspondencePostCode;
        } else if (!this.policyDetailData.officeAddress1) {
          this.policyDetailData.officeAddress1 = this.policyDetailData.correspondenceAddress1;
          this.policyDetailData.officeAddress2 = this.policyDetailData.correspondenceAddress2;
          this.policyDetailData.officeAddress3 = this.policyDetailData.correspondenceAddress3;
          this.policyDetailData.officeAddress4 = this.policyDetailData.correspondenceAddress4;
          this.policyDetailData.officeAddress5 = this.policyDetailData.correspondenceAddress5;
          this.policyDetailData.officeAddress6 = this.policyDetailData.correspondenceAddress6;
          this.policyDetailData.officeAddress7 = this.policyDetailData.correspondenceAddress7;
          this.policyDetailData.officeState = this.policyDetailData.correspondenceState;
          this.policyDetailData.officePostCode = this.policyDetailData.correspondencePostCode;
        }

        this.policyInvestment().subscribe((res: any) => {
          if (res.status == 100) {
            let decryptData = JSON.parse(this.cnf.decryptData(res.datas));
            this.policyInvestmentData = decryptData[0].policyInformation_fund_invest;
            this.loadingData = true;
          }
        });

        this.policyProduct().subscribe((res: any) => {
          if (res.status == 100) {
            let decryptData = JSON.parse(this.cnf.decryptData(res.datas));
            this.policyProductData = decryptData[0].policyInformation_product;
            this.loadingData = true;
          }
        });

        this.policyRider().subscribe((res: any) => {
          if (res.status == 100) {
            let decryptData = JSON.parse(this.cnf.decryptData(res.datas));
            this.policyRiderData = decryptData[0].policyInformation_prod_rider;
            this.loadingData = true;
          }
        });

        this.policyBeneficiary().subscribe((res: any) => {
          if (res.status == 100) {
            let decryptData = JSON.parse(this.cnf.decryptData(res.datas));
            this.policyBeneficiaryData = decryptData[0].policyInformation_beneficiary;
            this.loadingData = true;
          }
        });

        this.policyPayment().subscribe((res: any) => {
          if (res.status == 100) {
            let decryptData = JSON.parse(this.cnf.decryptData(res.datas));
            this.policyPaymentData = decryptData[0].policyInformation_payment;
            this.loadingData = true;

            this.paymentTotal = decryptData[0].total;
            this.paymentTotalDataPagination = decryptData[0].total;
            this.paymentTotalPages = decryptData[0].total_page;
          } else {
            this.paymentTotal = 0;
            this.paymentTotalDataPagination = 1;
            this.paymentTotalPages = 0;
          }
        });

        this.policyTransaction().subscribe((res: any) => {
          this.loadingData = true;
          if (res.status == 100) {
            let decryptData = JSON.parse(this.cnf.decryptData(res.datas));
            this.policyTransactionData = decryptData[0].policyInformation_transaction;

            this.transactionTotal = decryptData[0].total;
            this.transactionTotalDataPagination = decryptData[0].total;
            this.transactionTotalPages = decryptData[0].total_page;
          } else {
            this.transactionTotal = 0;
            this.transactionTotalDataPagination = 1;
            this.transactionTotalPages = 0;
          }
        });

        this.policyAgent().subscribe((res: any) => {
          if (res.status == 100) {
            let decryptData = JSON.parse(this.cnf.decryptData(res.datas));
            this.policyAgentData = decryptData[0].policyInformation_agent[0];
            this.loadingData = true;
          }
        });

        this.policyEStatement().subscribe((res: any) => {
          if (res.status == 100) {
            let decryptData = JSON.parse(this.cnf.decryptData(res.datas));
            this.policyEStatementData = decryptData[0].policyInformation_payment;
            this.loadingData = true;

            this.estatementTotal = decryptData[0].total;
            this.estatementTotalDataPagination = decryptData[0].total;
            this.estatementTotalPages = decryptData[0].total_page;
          } else {
            this.estatementTotal = 0;
            this.estatementTotalDataPagination = 1;
            this.estatementTotalPages = 0;
          }
        });

        this.policyEStatementYear().subscribe((res: any) => {
          if (res.status == 100) {
            let decryptData = JSON.parse(this.cnf.decryptData(res.datas));
            this.policyEStatementYearData = decryptData[0].policyInformation_estatment;
            this.loadingData = true;
          }
        });

        this.policyEStatementTIV().subscribe((res: any) => {
          if (res.status == 100) {
            let decryptData = JSON.parse(this.cnf.decryptData(res.datas));
            this.policyEStatementTIVData = decryptData[0].policyInformation_estatment;
            this.loadingData = true;
          }
        });
      } else {
        this.router.navigate(['/404']);
      }
    });
  }

  loadPagePayment(page: string) {
    if (page !== this.paymentPreviousPage) {
      this.paymentPreviousPage = page;
      this.paymentCurrentPage = page;
      this.policyPaymentData = [];

      this.policyPayment().subscribe((res: any) => {
        let decryptData = JSON.parse(this.cnf.decryptData(res.datas));
        this.policyPaymentData = decryptData[0].policyInformation_payment;
        this.loadingData = true;

        this.paymentTotal = decryptData[0].total;
        this.paymentTotalPages = decryptData[0].total_page;
      });
    }
  }

  doSearchPayment() {
    this.auditTrail.saveLog("My Data Policy Information", "Policy Detail Search Payment");
    this.policyPaymentData = [];
    this.paymentCurrentPage = 1;
    this.policyPayment().subscribe((res: any) => {
      this.loadingData = true;
      if (res.status == 100) {
        let decryptData = JSON.parse(this.cnf.decryptData(res.datas));
        this.policyPaymentData = decryptData[0].policyInformation_payment;
        this.paymentTotal = decryptData[0].total;
        this.paymentTotalPages = decryptData[0].total_page;
        this.paymentTotalDataPagination = decryptData[0].total;
      } else {
        this.paymentTotal = 0;
        this.paymentTotalDataPagination = 1;
        this.paymentTotalPages = 0;
      }
    });
  }

  doSearchEStatement() {
    this.auditTrail.saveLog("My Data Policy Information", "Policy Detail Search E Statement");
    this.policyEStatementData = [];
    this.estatementCurrentPage = 1;
    this.policyEStatement().subscribe((res: any) => {
      this.loadingData = true;

      if (res.status == 100) {
        let decryptData = JSON.parse(this.cnf.decryptData(res.datas));
        this.policyEStatementData = decryptData[0].policyInformation_payment;
        this.estatementTotal = decryptData[0].total;
        this.estatementTotalPages = decryptData[0].total_page;
      } else {
        this.estatementTotal = 0;
        this.estatementTotalPages = 0;
      }
    });
  }

  loadPageTransaction(page: string) {
    if (page !== this.transactionPreviousPage) {
      this.transactionPreviousPage = page;
      this.transactionCurrentPage = page;
      this.policyTransactionData = [];

      this.policyTransaction().subscribe((res: any) => {
        this.loadingData = true;
        if (res.status == 100) {
          let decryptData = JSON.parse(this.cnf.decryptData(res.datas));
          this.policyTransactionData = decryptData[0].policyInformation_transaction;

          this.transactionTotal = decryptData[0].total;
          this.transactionTotalPages = decryptData[0].total_page;
        } else {
          this.transactionTotal = 0;
          this.transactionTotalPages = 0;
        }
      });
    }
  }

  loadPageEStatement(page: string) {
    if (page !== this.estatementPreviousPage) {
      this.estatementPreviousPage = page;
      this.estatementCurrentPage = page;
      this.policyEStatementData = [];

      this.policyEStatement().subscribe((res: any) => {
        if( res.status == 100 ) {
          let decryptData = JSON.parse(this.cnf.decryptData(res.datas));
          this.policyEStatementData = decryptData[0].policyInformation_payment;
          this.loadingData = true;
  
          this.estatementTotal = decryptData[0].total;
          this.estatementTotalPages = decryptData[0].total_page;
        } else {
          this.estatementTotal = 0;
          this.estatementTotalPages = 0;
        }
      });
    }
  }

  doSearchTransaction() {
    this.auditTrail.saveLog("My Data Policy Information", "Policy Detail Search Transaction");
    this.policyTransactionData = [];
    this.transactionCurrentPage = 1;

    this.policyTransaction().subscribe((res: any) => {
      this.loadingData = true;
      if (res.status == 100) {
        let decryptData = JSON.parse(this.cnf.decryptData(res.datas));
        this.policyTransactionData = decryptData[0].policyInformation_transaction;

        this.transactionTotal = decryptData[0].total;
        this.transactionTotalDataPagination = decryptData[0].total;
        this.transactionTotalPages = decryptData[0].total_page;
      } else {
        this.transactionTotal = 0;
        this.transactionTotalPages = 0;
        this.transactionTotalDataPagination = 1;
      }
    });
  }

  policyDetail() {
    let params = new HttpParams();
    params = params.append('appid', 'test'); params = params.append('appkey', 'on');
    params = params.append('apptype', 'desktop');
    params = params.append('token', this.cnf.token);
    params = params.append('lang', this.cnf.lang);

    return this.http.get(this.cnf.URLWSNonPublicArea + '/policy_information/detail/policy/' + this.params.policyNo, { params })
      .map((response: Response) => response);
  }

  policyInvestment() {
    let params = new HttpParams();
    params = params.append('appid', 'test'); params = params.append('appkey', 'on');
    params = params.append('apptype', 'desktop');
    params = params.append('token', this.cnf.token);
    params = params.append('lang', this.cnf.lang);

    return this.http.get(this.cnf.URLWSNonPublicArea + '/policy_information/fund_invest/policy/' + this.params.policyNo, { params })
      .map((response: Response) => response);
  }

  policyProduct() {
    let params = new HttpParams();
    params = params.append('appid', 'test'); params = params.append('appkey', 'on');
    params = params.append('apptype', 'desktop');
    params = params.append('token', this.cnf.token);
    params = params.append('lang', this.cnf.lang);

    return this.http.get(this.cnf.URLWSNonPublicArea + '/policy_information/product/policy/' + this.params.policyNo, { params })
      .map((response: Response) => response);
  }

  policyRider() {
    let params = new HttpParams();
    params = params.append('appid', 'test'); params = params.append('appkey', 'on');
    params = params.append('apptype', 'desktop');
    params = params.append('token', this.cnf.token);
    params = params.append('lang', this.cnf.lang);

    return this.http.get(this.cnf.URLWSNonPublicArea + '/policy_information/prod_rider/policy/' + this.params.policyNo, { params })
      .map((response: Response) => response);
  }

  policyBeneficiary() {
    let params = new HttpParams();
    params = params.append('appid', 'test'); params = params.append('appkey', 'on');
    params = params.append('apptype', 'desktop');
    params = params.append('token', this.cnf.token);
    params = params.append('lang', this.cnf.lang);

    return this.http.get(this.cnf.URLWSNonPublicArea + '/policy_information/beneficiary/policy/' + this.params.policyNo, { params })
      .map((response: Response) => response);
  }

  policyPayment() {
    let startDate = '';
    if (this.paymentStartDate.day) {
      startDate = this.paymentStartDate.year + '-' + ('0' + this.paymentStartDate.month).slice(-2) + '-' + ('0' + this.paymentStartDate.day).slice(-2);
    }

    let endDate = '';
    if (this.paymentEndDate.day) {
      endDate = this.paymentEndDate.year + '-' + ('0' + this.paymentEndDate.month).slice(-2) + '-' + ('0' + this.paymentEndDate.day).slice(-2);
    }

    let params = new HttpParams();
    params = params.append('appid', 'test'); params = params.append('appkey', 'on');
    params = params.append('apptype', 'desktop');
    params = params.append('token', this.cnf.token);
    params = params.append('lang', this.cnf.lang);
    params = params.append('page', this.paymentCurrentPage);
    params = params.append('per_page', this.paymentPerPage);
    params = params.append('start_date', startDate);
    params = params.append('end_date', endDate);

    return this.http.get(this.cnf.URLWSNonPublicArea + '/policy_information/payment/policy/' + this.params.policyNo, { params })
      .map((response: Response) => response);
  }

  policyTransaction() {
    let startDate = '';
    if (this.transactionStartDate.day) {
      startDate = this.transactionStartDate.year + '-' + ('0' + this.transactionStartDate.month).slice(-2) + '-' + ('0' + this.transactionStartDate.day).slice(-2);
    }

    let endDate = '';
    if (this.transactionEndDate.day) {
      endDate = this.transactionEndDate.year + '-' + ('0' + this.transactionEndDate.month).slice(-2) + '-' + ('0' + this.transactionEndDate.day).slice(-2);
    }

    let params = new HttpParams();
    params = params.append('appid', 'test'); params = params.append('appkey', 'on');
    params = params.append('apptype', 'desktop');
    params = params.append('token', this.cnf.token);
    params = params.append('lang', this.cnf.lang);
    params = params.append('page', this.transactionCurrentPage);
    params = params.append('per_page', this.paymentPerPage);
    params = params.append('start_date', startDate);
    params = params.append('end_date', endDate);
    params = params.append('type', this.transactionType);

    return this.http.get(this.cnf.URLWSNonPublicArea + '/policy_information/transaction/policy/' + this.params.policyNo, { params })
      .map((response: Response) => response);
  }

  policyEStatement() {
    let startDate = '';
    if (this.estatementStartDate.day) {
      startDate = this.estatementStartDate.year + '-' + ('0' + this.estatementStartDate.month).slice(-2) + '-' + ('0' + this.estatementStartDate.day).slice(-2);
    }

    let endDate = '';
    if (this.estatementEndDate.day) {
      endDate = this.estatementEndDate.year + '-' + ('0' + this.estatementEndDate.month).slice(-2) + '-' + ('0' + this.estatementEndDate.day).slice(-2);
    }

    let params = new HttpParams();
    params = params.append('appid', 'test'); params = params.append('appkey', 'on');
    params = params.append('apptype', 'desktop');
    params = params.append('token', this.cnf.token);
    params = params.append('lang', this.cnf.lang);
    params = params.append('page', this.estatementCurrentPage);
    params = params.append('per_page', this.estatementPerPage);
    params = params.append('start_date', startDate);
    params = params.append('end_date', endDate);

    return this.http.get(this.cnf.URLWSNonPublicArea + '/policy_information/estatment/policy/' + this.params.policyNo, { params })
      .map((response: Response) => response);
  }

  policyEStatementYear() {
    let params = new HttpParams();
    params = params.append('appid', 'test'); params = params.append('appkey', 'on');
    params = params.append('apptype', 'desktop');
    params = params.append('token', this.cnf.token);
    params = params.append('lang', this.cnf.lang);

    return this.http.get(this.cnf.URLWSNonPublicArea + '/policy_information/estat-year/policy/' + this.params.policyNo, { params })
      .map((response: Response) => response);
  }

  policyEStatementTIV() {
    let params = new HttpParams();
    params = params.append('appid', 'test'); params = params.append('appkey', 'on');
    params = params.append('apptype', 'desktop');
    params = params.append('token', this.cnf.token);
    params = params.append('lang', this.cnf.lang);

    return this.http.get(this.cnf.URLWSNonPublicArea + '/policy_information/estat-tiv/policy/' + this.params.policyNo, { params })
      .map((response: Response) => response);
  }

  policyAgent() {
    let params = new HttpParams();
    params = params.append('appid', 'test'); params = params.append('appkey', 'on');
    params = params.append('apptype', 'desktop');
    params = params.append('token', this.cnf.token);
    params = params.append('lang', this.cnf.lang);

    return this.http.get(this.cnf.URLWSNonPublicArea + '/policy_information/agent/policy/' + this.params.policyNo, { params })
      .map((response: Response) => response);
  }

  backClicked() {
    this._location.back();
  }

  doDownloadEstatementFile(eStatementData) {
    this.auditTrail.saveLog("My Data Policy Information", "Download E-Statement File Policy Detail +#" + this.params.policyNo);
    let urlDownload = this.cnf.URLWS + "/" + eStatementData.archieveFileName + '/?userid=' + this.userId + '&token=' + this.cnf.token + '&transactiondate=' + eStatementData.transactionDate + '&transactiontype=' + eStatementData.transactionType;
    window.location.href = urlDownload;

  }

  doDownloadEstatementYearFile(eStatementData) {
    this.auditTrail.saveLog("My Data Policy Information", "Download E-Statement Year File Policy Detail +#" + this.params.policyNo);
    let urlDownload = this.cnf.URLWS + "/" + eStatementData.archieveFileName + '/?userid=' + this.userId + '&token=' + this.cnf.token;
    window.location.href = urlDownload;

  }

  doDownloadEstatementTIVFile(eStatementData) {
    this.auditTrail.saveLog("My Data Policy Information", "Download E-Statement TIV File Policy Detail +#" + this.params.policyNo);
    let urlDownload = this.cnf.URLWS + "/" + eStatementData.archieveFileName + '/?userid=' + this.userId + '&token=' + this.cnf.token;
    window.location.href = urlDownload;

  }

  today: any = new Date();
  paymentStartDate: any = {};
  paymentEndDate: any = {};
  transactionType: string = '';
  transactionStartDate: any = {};
  transactionEndDate: any = {};
  estatementStartDate: any = {};
  estatementEndDate: any = {};
}
