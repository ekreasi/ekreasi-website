import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Config } from '../../config'; 
import { AuditTrail } from './../../audit-trail';
import { Title } from '@angular/platform-browser';
import { CacheService } from '../../cache.service';

@Component({
  selector: 'app-reimbursement-tracking-detail',
  templateUrl: './reimbursement-tracking-detail.component.html',
  styleUrls: ['./reimbursement-tracking-detail.component.scss'],
  providers: [ Config, AuditTrail ]
})
export class ReimbursementTrackingDetailComponent implements OnInit {
  params: any = '';
  claimHeaderData: any = [];
  public loadingData: boolean = false;
  public userId: any = '';

  constructor(private route: ActivatedRoute, private cnf: Config, private auditTrail: AuditTrail, private titleService: Title, private router: Router, private http: HttpClient, private cacheService: CacheService, private _location: Location) {
    this.route.params.subscribe(params => this.params = params);
  }

  ngOnInit() {
    this.auditTrail.saveLog("Claim Tracking","Reimbursement Tracking #" + this.params.claimId);
    this.titleService.setTitle(this.cnf.prefixTitle + "Reimbursement Tracking #" + this.params.claimId + this.cnf.postfixTitle);

    this.userId = localStorage.getItem('userid');
    this.loadClaimHeader().subscribe((res: any) => {
      if (res.status == 100) {
        this.claimHeaderData = res.datas[0].claim_detail[0];
        this.loadingData = true;
      } else {
        this.router.navigate(['/404']);
      }
    });
    console.log(this.claimHeaderData);
  }

  loadClaimHeader() {
    let params = new HttpParams();
    params = params.append('appid', 'test'); params = params.append('appkey', 'on');
    params = params.append('apptype', 'desktop');
    params = params.append('token', this.cnf.token);
    params = params.append('lang', this.cnf.lang);

    return this.http.get(this.cnf.URLWSNonPublicArea + '/claim/detail/claimid/' + this.params.claimId, { params })
      .map((response: Response) => response);
  }

  backClicked() {
    this._location.back();
  }

}
