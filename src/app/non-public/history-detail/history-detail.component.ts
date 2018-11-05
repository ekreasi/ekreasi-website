import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Config } from '../../config'; 
import { AuditTrail } from './../../audit-trail';
import { Title } from '@angular/platform-browser';
import { CacheService } from '../../cache.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-history-detail',
  templateUrl: './history-detail.component.html',
  styleUrls: ['./history-detail.component.scss'],
  providers: [ Config, AuditTrail ],
  encapsulation: ViewEncapsulation.None
})
export class HistoryDetailComponent implements OnInit {
  params : any = '';
  public historyDetailData: any = [];
  public loadingData : boolean = false;
  public userId: any = '';

  constructor(private route: ActivatedRoute, private cnf: Config, private auditTrail: AuditTrail, private titleService: Title, private router: Router, private http: HttpClient, private cacheService: CacheService, private _location: Location) {
    this.route.params.subscribe( params => this.params = params );
  }

  ngOnInit() {
    this.auditTrail.saveLog("Claim History","History Detail #" + this.params.claimId);
    this.titleService.setTitle( this.cnf.prefixTitle + "History Detail #" + this.params.claimId + this.cnf.postfixTitle );

    console.log(this.params.claimId);
    this.userId = localStorage.getItem('userid');
    this.loadHistoryDetail().subscribe((res:any) => {
      if( res.status == 100 ) {
        this.historyDetailData = res.datas[0].claim_detail[0];
        this.loadingData = true;
      } else {
        this.router.navigate(['/404']);
      }
    });
  }

  loadHistoryDetail(){
    let params = new HttpParams();
    params = params.append('appid', 'test'); params = params.append('appkey', 'on');
    params = params.append('apptype', 'desktop');
    params = params.append('token', this.cnf.token);
    params = params.append('lang', this.cnf.lang);

    return this.http.get( this.cnf.URLWSNonPublicArea + '/claim/detail/new/claimid/'+this.params.claimId, {params} )
      .map((response: Response) => response);
  }

  backClicked() {
    this._location.back();
  }

}
