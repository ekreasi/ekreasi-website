import { Component, OnInit } from '@angular/core';
import { MouseEvent } from '@agm/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Config } from '../../config'; 
import { AuditTrail } from './../../audit-trail';
import { Title } from '@angular/platform-browser';
import { CacheService } from '../../cache.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-office-network',
  templateUrl: './office-network.component.html',
  styleUrls: ['./office-network.component.scss'],
	providers: [ Config, AuditTrail ]
})
export class OfficeNetworkComponent implements OnInit {
  public loadingData : boolean = false;
  dataOfficeNetwork: any = [];

  page = 1;
  zoom: number = 15;
  lat: number =  -6.224783;
  lng: number = 106.810068;
  markers: marker[];
  public preview: any = '';
  public token: any = '';

  constructor(private cnf: Config, private auditTrail: AuditTrail, private titleService: Title, private http: HttpClient, private cacheService: CacheService, private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      this.preview = params['preview'];
      this.token = params['token'];
    });
  }

  ngOnInit() {
    this.cacheService.get(this.cnf.lang + '/office_network', this.loadData()).subscribe((res:any) => {
      this.loadingData = true;
      if (res.status == 100) {
        let dataTemp = JSON.parse(this.cnf.decryptData(res.datas)).office_network;

        let dataTempSave = [];
        for( let i in dataTemp ){
          let dataCategory = dataTemp[i];

          let dataTempCategory = [];
          for( let x in dataCategory.data ) {
            let dataOffice = dataCategory.data[x];
            dataOffice.map_lat = Number(dataOffice.map_lat);
            dataOffice.map_long = Number(dataOffice.map_long);

            dataTempCategory.push(dataOffice);
          }

          let dataTempOffice = {
            title: '',
            data: []
          };
          dataTempOffice.title = dataCategory.title;
          dataTempOffice.data = dataTempCategory;
          dataTempSave.push(dataTempOffice);
        }
        this.dataOfficeNetwork = dataTempSave;
        
        let message = 'Office Network';
        this.titleService.setTitle( this.cnf.prefixTitle + message + this.cnf.postfixTitle );
      }
    });
  }

  loadData(){
    let params = new HttpParams();
    params = params.append('appid', this.cnf.appid);
    params.append('appkey', this.cnf.appkey);
    params = params.append('lang', this.cnf.lang);

    let url = this.cnf.URLWS + '/office_network';
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
interface marker {
  lat: number;
  lng: number;
}