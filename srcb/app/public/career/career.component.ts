import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Config } from '../../config';
import { AuditTrail } from '../../audit-trail';
import { Title } from '@angular/platform-browser';
import { CacheService } from '../../cache.service';

@Component({
  selector: 'app-career',
  templateUrl: './career.component.html',
  styleUrls: ['./career.component.scss'],
  providers: [Config, AuditTrail]
})
export class CareerComponent implements OnInit {
  

  constructor(private router: Router, private route: ActivatedRoute, private cnf: Config, private auditTrail: AuditTrail, private titleService: Title, private http: HttpClient, private cacheService: CacheService) {

  }

  ngOnInit() {
    this.titleService.setTitle(this.cnf.prefixTitle + 'Agents' + this.cnf.postfixTitle);
  }


}
