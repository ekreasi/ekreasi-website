import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Config } from '../../config'; 
import { AuditTrail } from '../../audit-trail';
import { Title } from '@angular/platform-browser';
import { CacheService } from '../../cache.service';

@Component({
  selector: 'app-detail-portfolio',
  templateUrl: './detail-portfolio.component.html',
  styleUrls: ['./detail-portfolio.component.scss'],
	providers: [ Config, AuditTrail ]
})
export class DetailPortfolioComponent implements OnInit {
  params : any;
  data: any = {};
  public preview: any = '';
  public token: any = '';

  constructor( private route: ActivatedRoute, private cnf: Config, private auditTrail: AuditTrail, private titleService: Title, private http:HttpClient, private cacheService: CacheService ) {
    this.route.params.subscribe( params => this.params = params );
    this.route.queryParams.subscribe(params => {
      this.preview = params['preview'];
      this.token = params['token'];
    });
  }

  ngOnInit() {
    this.cacheService.get(this.cnf.lang + '/detail_news/'+this.params.id, this.loadData()).subscribe((res:any) => {
      if (res.status == 100) {
        this.data = res.datas;
        this.titleService.setTitle( this.cnf.prefixTitle + this.data.title + this.cnf.postfixTitle );
      }
    });
  }

  loadData(){
    let params = new HttpParams();
    params = params.append('appid', this.cnf.appid);
    params.append('appkey', this.cnf.appkey);
    params = params.append('lang', this.cnf.lang);

    let url = this.cnf.URLWS + '/news';
    if (this.preview) {
      params = params.append('token', this.token);
      url = url + '/preview/' + this.params.id;
    } else {
      url = url + '/frontend/byid/' + this.params.id;
    }

    return this.http.get(url, { params })
      .map((response: Response) => response);
  }

}
