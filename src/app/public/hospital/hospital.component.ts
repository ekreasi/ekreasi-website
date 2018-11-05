import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Config } from '../../config';
import { AuditTrail } from './../../audit-trail';
import { Title } from '@angular/platform-browser';
import { CacheService } from '../../cache.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-hospital',
  templateUrl: './hospital.component.html',
  styleUrls: ['./hospital.component.scss'],
  providers: [Config, AuditTrail]
})
export class HospitalComponent implements OnInit {
  data: any = {};
  preview: any = '';
  token: any = '';
  search: string = '';
  loadingData: boolean;
  location: any;

  // pagination
  currentPage: any = 1;
  perPage: any = 10;
  totalPages: any;
  total: any;
  totalPagination: any;
  previousPage: any;

  hospitalLocationData: any = [];
  hospitalLocationContentData: any = [];
  attoken: string = '';
  projectName: string = 'hospital-provider';

  constructor(private cnf: Config, private auditTrail: AuditTrail, private titleService: Title, private http: HttpClient, private cacheService: CacheService, private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      this.search = (params['from'] ? params['from'] : '');
      this.preview = params['preview'];
      this.token = params['token'];
    });
  }

  ngOnInit() {
    this.cnf.getAttoken().subscribe((res: any) => {
      if (res.status == 100) {
        this.attoken = this.cnf.generateAttoken(this.projectName, res.datas);
      }

      this.cacheService.get(this.cnf.lang + '/hospital_provider/getProvince/', this.loadDataHospitalLocation()).subscribe((res: any) => {
        if (res.status == 100) {
          this.hospitalLocationData = res.datas;

          for (let i in this.hospitalLocationData) {
            this.hospitalLocationContentData[this.hospitalLocationData[i].id] = [];
          }

          this.location = this.hospitalLocationData[0].id;
          let location = this.location;
          this.loadDataHospitalByLocation(location).subscribe((res: any) => {
            this.loadingData = true;
            if (res.status == 100) {
              let datas =res.datas;
              this.hospitalLocationContentData[this.location] = this.mergeData(datas.hospital);
              this.total = datas.total;
              this.totalPagination = datas.total;
              this.totalPages = datas.total_page;
            } else {
              this.hospitalLocationContentData[this.location] = [];
            }
          });
        }
      });
    });
  }

  loadHospitalLocationContent(location) {
    if (this.location != location.id) {
      this.loadingData = false;
      this.location = location.id;
      this.currentPage = 1;
      this.previousPage = 1;

      this.cnf.getAttoken().subscribe((res: any) => {
        if (res.status == 100) {
          this.attoken = this.cnf.generateAttoken(this.projectName, res.datas);
        }
        this.hospitalLocationContentData[this.location] = [];
        this.loadDataHospitalByLocation(this.location).subscribe((res: any) => {
          this.loadingData = true;
          if (res.status == 100) {
            let datas = res.datas;
            this.hospitalLocationContentData[this.location] = this.mergeData(datas.hospital);
            this.total = datas.total;
            this.totalPagination = datas.total;
            this.totalPages = datas.total_page;
          } else {
            this.hospitalLocationContentData[this.location] = [];
          }
        });
      });
    }
  }

  loadPage(page: string, location) {
    if (page !== this.previousPage) {
      this.previousPage = page;
      this.currentPage = page;

      this.cnf.getAttoken().subscribe((res: any) => {
        if (res.status == 100) {
          this.attoken = this.cnf.generateAttoken(this.projectName, res.datas);
        }
        this.hospitalLocationContentData[location] = [];
        this.loadDataHospitalByLocation(location).subscribe((res: any) => {
          this.loadingData = true;
          if (res.status == 100) {
            let datas = res.datas;
            this.hospitalLocationContentData[this.location] = this.mergeData(datas.hospital);
            this.total = datas.total;
            this.totalPagination = datas.total;
            this.totalPages = datas.total_page;
          } else {
            this.hospitalLocationContentData[this.location] = [];
          }
        });
      });
    }
  }

  onSearch() {
    this.loadingData = false;
    this.currentPage = 1;
    this.previousPage = 1;
    this.cnf.getAttoken().subscribe((res: any) => {
      if (res.status == 100) {
        this.attoken = this.cnf.generateAttoken(this.projectName, res.datas);
      }
      this.loadDataHospitalLocation().subscribe((res: any) => {
        this.hospitalLocationData = [];
        if (res.status == 100) {
          this.hospitalLocationData = res.datas;

          for (let i in this.hospitalLocationData) {
            this.hospitalLocationContentData[this.hospitalLocationData[i]] = [];
          }

          this.location = this.hospitalLocationData[0].id;
          let location = this.location;

          this.loadDataHospitalByLocation(location).subscribe((res: any) => {
            this.loadingData = true;
            if (res.status == 100) {
              let datas = res.datas;
              this.hospitalLocationContentData[this.location] = this.mergeData(datas.hospital);
              this.total = datas.total;
              this.totalPagination = datas.total;
              this.totalPages = datas.total_page;
            } else {
              this.hospitalLocationContentData[this.location] = [];
            }
          });
        }
      });
    });
  }

  mergeData(data) {
    let dataOutput = [];
    let dataCheck = [];
    for (let i in data) {
      let dataTemp = data[i];
      if (dataCheck.indexOf(dataTemp.name) === -1) {
        let output = {
          title: dataTemp.name,
          data: []
        };
        dataOutput.push(output);
        dataCheck.push(dataTemp.name);
      }
    }

    for (let i in dataOutput) {
      let dataOutputTemp = dataOutput[i];

      for (let x in data) {
        let dataTemp = data[x];
        if (dataTemp.name == dataOutputTemp.title) {
          dataOutput[i].data.push(dataTemp);
        }
      }
    }

    return dataOutput;
  }

  loadDataHospitalLocation() {
    let params = new HttpParams();
    params = params.append('appid', 'test');
    params = params.append('appkey', 'on');
    params = params.append('apptype', 'desktop');
    params = params.append('token', this.attoken);
    params = params.append('lang', this.cnf.lang);
    params = params.append('search', this.search);

    return this.http.get(this.cnf.URLWS + '/hospital_provider/getProvince', { params })
      .map((response: Response) => response);
  }

  loadDataHospitalByLocation(location) {
    let params = new HttpParams();
    params = params.append('appid', 'test');
    params = params.append('appkey', 'on');
    params = params.append('apptype', 'desktop');
    params = params.append('id', location);
    params = params.append('token', this.attoken);
    params = params.append('lang', this.cnf.lang);
    params = params.append('search', this.search);
    params = params.append('page', this.currentPage);
    params = params.append('per_page', this.perPage);

    return this.http.get(this.cnf.URLWS + '/hospital_provider/byIdProvince/', { params })
      .map((response: Response) => response);
  }
}