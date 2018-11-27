import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Config } from '../../config';
import { AuditTrail } from './../../audit-trail';
import { Title } from '@angular/platform-browser';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CacheService } from '../../cache.service';

@Component({
  selector: 'app-notification-detail',
  templateUrl: './inbox-detail.component.html',
  styleUrls: ['./inbox-detail.component.scss'],
  providers: [Config, AuditTrail]
})
export class InboxDetailComponent implements OnInit {

  data: any = {};
  params: any;
  public userId: any = '';
  attoken: string = '';
  projectName: string = 'inbox-blast';
  constructor(private cnf: Config, private auditTrail: AuditTrail, private titleService: Title, private router: Router, private http: HttpClient, private cacheService: CacheService, private _location: Location, private route: ActivatedRoute) {
    this.route.params.subscribe(params => this.params = params);
  }

  ngOnInit() {
    this.auditTrail.saveLog("Inbox", "Inbox Detail" + this.cnf.postfixTitle);
    this.userId = localStorage.getItem('userid');
    this.cnf.getAttoken().subscribe((res: any) => {
      if (res.status == 100) {
        this.attoken = this.cnf.generateAttoken(this.projectName, res.datas);
      }
  
      this.loadData().subscribe((res: any) => {
        if (res.status == 100) {
          this.data = res.datas;
          this.titleService.setTitle(this.cnf.prefixTitle + this.data.subject + " - Inbox Detail" + this.cnf.postfixTitle);
        }
      });
    });
  }

  backClicked() {
    this._location.back();
  }

  loadData() {
    let params = new HttpParams();
    params = params.append('appid', 'test');
    params = params.append('appkey', 'on');
    params = params.append('apptype', 'desktop');
    params = params.append('lang', this.cnf.lang);
    params = params.append('userid', this.userId);
    params = params.append('attoken', this.attoken);

    return this.http.get(this.cnf.URLWSNonPublicArea + '/inbox_blast/frontend/byid/' + this.params.id, { params })
      .map((response: Response) => response);
  }

  doDelete() {

    this.loadDeleteData(this.params.id).subscribe((res: any) => {
      this.router.navigate(['/inbox']);
    });
    this.auditTrail.saveLog("Inbox", "Delete Inbox " + this.cnf.postfixTitle);
  }

  loadDeleteData(inboxId) {
    let params = new HttpParams();
    params = params.append('appid', 'test');
    params = params.append('appkey', 'on');
    params = params.append('apptype', 'desktop');
    params = params.append('token', this.cnf.token);
    params = params.append('userid', this.userId);
    params = params.append('attoken', this.attoken);

    return this.http.get(this.cnf.URLWSNonPublicArea + '/inbox_blast/frontend/delete/' + inboxId, { params })
      .map((response: Response) => response);
  }

}
