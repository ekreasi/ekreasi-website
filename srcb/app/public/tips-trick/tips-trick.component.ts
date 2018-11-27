import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Config } from '../../config'; 
import { AuditTrail } from './../../audit-trail';
import { Title } from '@angular/platform-browser';
import { CacheService } from '../../cache.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tips-trick',
  templateUrl: './tips-trick.component.html',
  styleUrls: ['./tips-trick.component.scss'],
  providers: [ Config, AuditTrail ]
})
export class TipsTrickComponent implements OnInit {
  public loadingData: boolean = false;

  totalPages: any;
  total: any;
  totalDataPagination: any = '1';
  perPage: any = '10';
  currentPage: any = '1';
  previousPage: any;
  data: any = {};
  public preview: any = '';
  public token: any = '';

  constructor(private cnf: Config, private auditTrail: AuditTrail, private titleService: Title, private http: HttpClient, private cacheService: CacheService, private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      this.preview = params['preview'];
      this.token = params['token'];
    });
  }

  ngOnInit() {
    this.titleService.setTitle( this.cnf.prefixTitle + "Tips and Trick" + this.cnf.postfixTitle );
    this.loadPage("1");
  }

  loadPage(page: string) {
    if (page !== this.previousPage) {
      this.previousPage = page;
      this.currentPage = page;

      this.data = [];

      this.cacheService.get(this.cnf.lang + '/education_center/' + this.currentPage + '/' + this.perPage, this.loadData()).subscribe((res: any) => {
        this.loadingData = true;
        if (res.status == 100) {
          let datas = res.datas;
          this.data = datas;
          this.total = datas.total;
          this.totalDataPagination = datas.total;
          this.totalPages = datas.total_page;
        }
      });
    }
  }

  loadData() {
    let params = new HttpParams();
    params = params.append('appid', this.cnf.appid);
    params.append('appkey', this.cnf.appkey);
    params = params.append('lang', this.cnf.lang);
    params = params.append('page', this.currentPage);
    params = params.append('per_page', this.perPage);

    let url = this.cnf.URLWS + '/education_center';
    if (this.preview) {
      params = params.append('token', this.token);
      url = url + '/preview';
    } else {
      url = url + '/frontend/all';
    }

    return this.http.get(url, { params })
      .map((response: Response) => response);
  }

}
