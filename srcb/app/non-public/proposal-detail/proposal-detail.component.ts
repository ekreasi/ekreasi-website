import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { Location } from '@angular/common';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Config } from '../../config';
import { AuditTrail } from './../../audit-trail';
import { Title } from '@angular/platform-browser';
import { CacheService } from '../../cache.service';
import { NgbDateFRParserFormatter } from '../../ngb-date-fr-parser-formatter';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-proposal-detail',
  templateUrl: './proposal-detail.component.html',
  styleUrls: ['./proposal-detail.component.scss'],
  providers: [Config, AuditTrail, { provide: NgbDateParserFormatter, useClass: NgbDateFRParserFormatter }]
})
export class ProposalDetailComponent implements OnInit {
  params: any = '';
  proposalHeaderData: any = {};
  proposalFundData: any = [];
  proposalRiderData: any = [];
  proposalTrackingData: any = {};
  proposalAgentData: any = {};
  proposalBeneficiaryData: any = [];
  proposalLifeAssuredData: any = [];
  proposalLifeProductData: any = [];
  public loadingData: boolean = false;
  public userId: any = '';

  constructor(private route: ActivatedRoute, private cnf: Config, private auditTrail: AuditTrail, private titleService: Title, private router: Router, private http: HttpClient, private cacheService: CacheService, private _location: Location) {
    this.route.params.subscribe(params => this.params = params);
  }

  ngOnInit() {
    this.auditTrail.saveLog("My Data Proposal Information", "Proposal Detail #" + this.params.ppajNo);
    this.titleService.setTitle(this.cnf.prefixTitle + "Proposal Detail #" + this.params.ppajNo + this.cnf.postfixTitle);

    this.userId = localStorage.getItem('userid');
    this.proposalHeader().subscribe((res: any) => {
      this.loadingData = true;
      if (res.status == 100) {
        let decryptData = JSON.parse(this.cnf.decryptData(res.datas));
        this.proposalHeaderData = decryptData[0].proposalInformation_detail[0];

        if (!this.proposalHeaderData.homeAddress1) {
          this.proposalHeaderData.homeAddress1 = this.proposalHeaderData.correspondenceAddress1;
          this.proposalHeaderData.homeAddress2 = this.proposalHeaderData.correspondenceAddress2;
          this.proposalHeaderData.homeAddress3 = this.proposalHeaderData.correspondenceAddress3;
          this.proposalHeaderData.homeAddress4 = this.proposalHeaderData.correspondenceAddress4;
          this.proposalHeaderData.homeAddress5 = this.proposalHeaderData.correspondenceAddress5;
          this.proposalHeaderData.homeAddress6 = this.proposalHeaderData.correspondenceAddress6;
          this.proposalHeaderData.homeAddress7 = this.proposalHeaderData.correspondenceAddress7;
          this.proposalHeaderData.homeState = this.proposalHeaderData.correspondenceState;
          this.proposalHeaderData.homePostCode = this.proposalHeaderData.correspondencePostCode;
        } else if (!this.proposalHeaderData.officeAddress1) {
          this.proposalHeaderData.officeAddress1 = this.proposalHeaderData.correspondenceAddress1;
          this.proposalHeaderData.officeAddress2 = this.proposalHeaderData.correspondenceAddress2;
          this.proposalHeaderData.officeAddress3 = this.proposalHeaderData.correspondenceAddress3;
          this.proposalHeaderData.officeAddress4 = this.proposalHeaderData.correspondenceAddress4;
          this.proposalHeaderData.officeAddress5 = this.proposalHeaderData.correspondenceAddress5;
          this.proposalHeaderData.officeAddress6 = this.proposalHeaderData.correspondenceAddress6;
          this.proposalHeaderData.officeAddress7 = this.proposalHeaderData.correspondenceAddress7;
          this.proposalHeaderData.officeState = this.proposalHeaderData.correspondenceState;
          this.proposalHeaderData.officePostCode = this.proposalHeaderData.correspondencePostCode;
        }
        this.proposalLifeAssured().subscribe((res: any) => {
          if (res.status == 100) {
            let decryptData = JSON.parse(this.cnf.decryptData(res.datas));
            this.proposalLifeAssuredData = decryptData[0].proposalInformation_lifeAssured;
          }
          this.loadingData = true;
        });

        this.proposalFund().subscribe((res: any) => {
          if (res.status == 100) {
            let decryptData = JSON.parse(this.cnf.decryptData(res.datas));
            this.proposalFundData = decryptData[0].proposalInformation_agent;
          }
          this.loadingData = true;
        });

        this.proposalProduct().subscribe((res: any) => {
          if (res.status == 100) {
            let decryptData = JSON.parse(this.cnf.decryptData(res.datas));
            this.proposalLifeProductData = decryptData[0].proposalInformation_product;
          }
          this.loadingData = true;
        });

        this.proposalRider().subscribe((res: any) => {
          if (res.status == 100) {
            let decryptData = JSON.parse(this.cnf.decryptData(res.datas));
            this.proposalRiderData = decryptData[0].proposalInformation_rider;
          }
          this.loadingData = true;
        });

        this.proposalTracking().subscribe((res: any) => {
          if (res.status == 100) {
            let decryptData = JSON.parse(this.cnf.decryptData(res.datas));
            this.proposalTrackingData = decryptData[0].proposalInformation_tracking[0];
          }
          this.loadingData = true;
        });

        this.proposalBenef().subscribe((res: any) => {
          if (res.status == 100) {
            let decryptData = JSON.parse(this.cnf.decryptData(res.datas));
            this.proposalBeneficiaryData = decryptData[0].proposalInformation_agent;
          }
          this.loadingData = true;
        });

        this.proposalAgent().subscribe((res: any) => {
          if (res.status == 100) {
            let decryptData = JSON.parse(this.cnf.decryptData(res.datas));
            this.proposalAgentData = decryptData[0].proposalInformation_agent[0];
          }
          this.loadingData = true;
        });
      } else {
        this.router.navigate(['/404']);
      }
    });
  }

  proposalHeader() {
    let params = new HttpParams();
    params = params.append('appid', 'test'); params = params.append('appkey', 'on');
    params = params.append('apptype', 'desktop');
    params = params.append('token', this.cnf.token);
    params = params.append('lang', this.cnf.lang);

    return this.http.get(this.cnf.URLWSNonPublicArea + '/proposal_information/detail/ppaj/' + this.params.ppajNo, { params })
      .map((response: Response) => response);
  }

  proposalLifeAssured() {
    let params = new HttpParams();
    params = params.append('appid', 'test'); params = params.append('appkey', 'on');
    params = params.append('apptype', 'desktop');
    params = params.append('token', this.cnf.token);
    params = params.append('lang', this.cnf.lang);

    return this.http.get(this.cnf.URLWSNonPublicArea + '/proposal_information/life_assured/ppaj/' + this.params.ppajNo, { params })
      .map((response: Response) => response);
  }

  proposalFund() {
    let params = new HttpParams();
    params = params.append('appid', 'test'); params = params.append('appkey', 'on');
    params = params.append('apptype', 'desktop');
    params = params.append('token', this.cnf.token);
    params = params.append('lang', this.cnf.lang);

    return this.http.get(this.cnf.URLWSNonPublicArea + '/proposal_information/fund/ppaj/' + this.params.ppajNo, { params })
      .map((response: Response) => response);
  }

  proposalProduct() {
    let params = new HttpParams();
    params = params.append('appid', 'test'); params = params.append('appkey', 'on');
    params = params.append('apptype', 'desktop');
    params = params.append('token', this.cnf.token);
    params = params.append('lang', this.cnf.lang);

    return this.http.get(this.cnf.URLWSNonPublicArea + '/proposal_information/product/ppaj/' + this.params.ppajNo, { params })
      .map((response: Response) => response);
  }

  proposalRider() {
    let params = new HttpParams();
    params = params.append('appid', 'test'); params = params.append('appkey', 'on');
    params = params.append('apptype', 'desktop');
    params = params.append('token', this.cnf.token);
    params = params.append('lang', this.cnf.lang);

    return this.http.get(this.cnf.URLWSNonPublicArea + '/proposal_information/rider/ppaj/' + this.params.ppajNo, { params })
      .map((response: Response) => response);
  }

  proposalTracking() {
    let params = new HttpParams();
    params = params.append('appid', 'test'); params = params.append('appkey', 'on');
    params = params.append('apptype', 'desktop');
    params = params.append('token', this.cnf.token);
    params = params.append('lang', this.cnf.lang);

    return this.http.get(this.cnf.URLWSNonPublicArea + '/proposal_information/tracking/ppaj/' + this.params.ppajNo, { params })
      .map((response: Response) => response);
  }

  proposalBenef() {
    let params = new HttpParams();
    params = params.append('appid', 'test'); params = params.append('appkey', 'on');
    params = params.append('apptype', 'desktop');
    params = params.append('token', this.cnf.token);
    params = params.append('lang', this.cnf.lang);

    return this.http.get(this.cnf.URLWSNonPublicArea + '/proposal_information/benef/ppaj/' + this.params.ppajNo, { params })
      .map((response: Response) => response);
  }

  proposalAgent() {
    let params = new HttpParams();
    params = params.append('appid', 'test'); params = params.append('appkey', 'on');
    params = params.append('apptype', 'desktop');
    params = params.append('token', this.cnf.token);
    params = params.append('lang', this.cnf.lang);

    return this.http.get(this.cnf.URLWSNonPublicArea + '/proposal_information/agent/ppaj/' + this.params.ppajNo, { params })
      .map((response: Response) => response);
  }

  backClicked() {
    this._location.back();
  }
}
