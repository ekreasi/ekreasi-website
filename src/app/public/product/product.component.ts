import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Config } from '../../config'; 
import { AuditTrail } from './../../audit-trail';
import { Title } from '@angular/platform-browser';
import { CacheService } from '../../cache.service';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-product',
	templateUrl: './product.component.html',
	styleUrls: ['./product.component.scss'],
	providers: [ Config, AuditTrail ]
})
export class ProductComponent implements OnInit {
	public loadingData: boolean = false;
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
		this.cacheService.get(this.cnf.lang + '/product', this.loadData()).subscribe((res: any) => {
			this.loadingData = true;
			if (res.status == 100) {
				this.data = res.datas;
				this.titleService.setTitle( this.cnf.prefixTitle + this.data.title + this.cnf.postfixTitle);
			}
		});
	}

	loadData() {
		let params = new HttpParams();
		params = params.append('appid', this.cnf.appid);
		params.append('appkey', this.cnf.appkey);
		params = params.append('lang', this.cnf.lang);

		let url = this.cnf.URLWS + '/product';
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