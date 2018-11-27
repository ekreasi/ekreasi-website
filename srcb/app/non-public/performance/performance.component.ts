import { Component, OnInit, ElementRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Config } from '../../config';
import { AuditTrail } from './../../audit-trail';
import { Title } from '@angular/platform-browser';
import { CacheService } from '../../cache.service';
import { forEach } from '@angular/router/src/utils/collection';
import { chart } from 'highcharts';
import { Location } from '@angular/common';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'charts-performance',
  templateUrl: './performance.component.html',
  styleUrls: ['./performance.component.scss'],
  providers: [Config, AuditTrail],
  encapsulation: ViewEncapsulation.None
})
export class PerformanceComponent implements OnInit {
  params: any;
  public loadingData: boolean = false;
  public userId: any = '';

  constructor(private route: ActivatedRoute, private cnf: Config, private auditTrail: AuditTrail, private titleService: Title, private http: HttpClient, private cacheService: CacheService, private _location: Location) {
    this.route.params.subscribe(params => this.params = params);
  }

  ngOnInit() {
    this.auditTrail.saveLog("Fund Performance", "Open");
    this.titleService.setTitle(this.cnf.prefixTitle + "Performance" + this.cnf.postfixTitle);
  }

  backClicked() {
    this._location.back();
  }

}
