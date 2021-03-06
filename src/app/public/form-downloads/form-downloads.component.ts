import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Config } from '../../config'; 
import { AuditTrail } from './../../audit-trail';
import { Title } from '@angular/platform-browser';
import { CacheService } from '../../cache.service';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-form-downloads',
	templateUrl: './form-downloads.component.html',
	styleUrls: ['./form-downloads.component.scss'],
	providers: [ Config, AuditTrail ]
})
export class FormDownloadsComponent implements OnInit {
	data : any = {};
  public loadingData: boolean = false;
  public preview: any = '';
  public token: any = '';
  public titleIcon: any;

  constructor(private cnf: Config, private auditTrail: AuditTrail, private titleService: Title, private http: HttpClient, private cacheService: CacheService, private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      this.preview = params['preview'];
      this.token = params['token'];
    });
  }

  ngOnInit() {
    this.cacheService.get(this.cnf.lang + '/form_download', this.loadData()).subscribe((res:any) => {
      this.loadingData = true;
      if (res.status == 100) {
        this.data = res.datas.downloads;

        var _titleIcons = [
          { "icon": 'icon-claimform' },
          { "icon": 'icon-customerform' },
          { "icon": 'icon-claimform' },
          { "icon": 'icon-customerform' },
          { "icon": 'icon-claimform' },
          { "icon": 'icon-customerform' }
        ];

        let dataPush = [];
        for( let i in this.data ){
          let dataTemp = this.data[i];
          dataTemp.icon = _titleIcons[i].icon;
          dataPush.push(dataTemp);
        }
        this.data = dataPush;


        this.titleService.setTitle( this.cnf.prefixTitle + this.data.title + this.cnf.postfixTitle );

      }
    });

  }

  loadData(){
    let params = new HttpParams();
    params = params.append('appid', this.cnf.appid);
    params.append('appkey', this.cnf.appkey);
    params = params.append('lang', this.cnf.lang);

    let url = this.cnf.URLWS + '/form_download';
    if (this.preview) {
      params = params.append('token', this.token);
      url = url + '/preview/' + this.preview;
    } else {
      url = url + '/frontend/all';
    }

    return this.http.get(url, { params })
      .map((response: Response) => response);
  }

}