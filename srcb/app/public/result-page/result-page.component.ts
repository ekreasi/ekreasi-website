import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Config } from '../../config'; 
import { AuditTrail } from './../../audit-trail';
import { Title } from '@angular/platform-browser';
import { CacheService } from '../../cache.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-result-page',
  templateUrl: './result-page.component.html',
  styleUrls: ['./result-page.component.scss'],
	providers: [ Config, AuditTrail ]
})
export class ResultPageComponent implements OnInit {
	public loadingData: boolean = false;
  public params: any = '';
  public query: any = ''; 
  public search: string = "";
  public currentPage: any = 1;
  public perPage: any = 15;
  public totalPages: any;
  public total: any;
  public previousPage: any;
  public searchResult: any = [];
	public preview: any = '';
	public token: any = '';

  constructor(private cnf: Config, private auditTrail: AuditTrail, private titleService: Title, private http: HttpClient, private cacheService: CacheService, private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.params = params;
      this.query = this.params.query;
      this.searchResult = [];
      this.titleService.setTitle( this.cnf.prefixTitle + "Pencarian" + this.cnf.postfixTitle);
      this.cacheService.get(this.cnf.lang + '/search/query/' + this.query, this.loadData()).subscribe((res: any) => {
        this.loadingData = true;
        if (res.status == 100) {
          this.searchResult = res.datas;
        }
      });
    });
  }

  ngOnInit() {
  }

  loadData() {
		let params = new HttpParams();
		params = params.append('appid', this.cnf.appid);
		params.append('appkey', this.cnf.appkey);
		params = params.append('lang', this.cnf.lang);

		let url = this.cnf.URLWS + '/search/query/';
		url = url + '/' + this.query + '/';

		return this.http.get(url, { params })
			.map((response: Response) => response);
	}

}
