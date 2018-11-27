import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Config } from '../../config'; 
import { AuditTrail } from './../../audit-trail';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-cashless-tracking-detail',
  templateUrl: './cashless-tracking-detail.component.html',
  styleUrls: ['./cashless-tracking-detail.component.scss'],
  providers: [ Config, AuditTrail ]
})
export class CashlessTrackingDetailComponent implements OnInit {
  params : any = '';
  data: any = {};

  constructor(private cnf: Config, private auditTrail: AuditTrail, private titleService: Title, private route: ActivatedRoute, private router: Router, private _location: Location) {
    this.route.params.subscribe( params => this.params = params );
  }

  ngOnInit() {
    this.auditTrail.saveLog("Claim Tracking", "Cashless Tracking #" + this.params.claimId );
    this.titleService.setTitle( this.cnf.prefixTitle + "Cashless Tracking #" + this.params.claimId + this.cnf.postfixTitle );

    console.log(this.params);
    this.data = ( localStorage.getItem("cashlessTempData") ? JSON.parse(localStorage.getItem("cashlessTempData")) : {} );
    if( this.data.claim_id != this.params.claimId ) {
      this.router.navigate(['/claim/tracking']);
    }

  }

  backClicked() {
    this._location.back();
  }

}
