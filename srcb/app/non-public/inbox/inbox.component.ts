import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Config } from '../../config';
import { AuditTrail } from './../../audit-trail';
import { Title } from '@angular/platform-browser';
import { CacheService } from '../../cache.service';

@Component({
  selector: 'app-notification',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.scss'],
  providers: [Config, AuditTrail]
})
export class InboxComponent implements OnInit {
  public userId: any = '';
  page = 1;
  inboxData: any = [];
  public loadingData: boolean = false;
  selectedAll: any;

  // paging
  currentPage: any = 1;
  perPage: any = 10;
  totalPages: any = 1;
  total: any = 0;
  totalDataPagination: any = 1;
  previousPage: any = 1;
  attoken: string = '';
  projectName: string = 'inbox-blast';

  constructor(private cnf: Config, private auditTrail: AuditTrail, private titleService: Title, private http: HttpClient, private cacheService: CacheService, private _location: Location) {

  }

  backClicked() {
    this._location.back();
  }

  ngOnInit() {
    this.auditTrail.saveLog("Inbox", "Open");
    this.titleService.setTitle(this.cnf.prefixTitle + "Inbox" + this.cnf.postfixTitle);

    this.userId = localStorage.getItem('userid');

    this.cnf.getAttoken().subscribe((res: any) => {
      if (res.status == 100) {
        this.attoken = this.cnf.generateAttoken(this.projectName, res.datas);
      }
      this.loadData().subscribe((res: any) => {
        this.loadingData = true;

        if (res.status == 100) {
          this.inboxData = res.datas.inbox;
          this.total = res.datas.total;
          this.totalDataPagination = res.datas.total;
          this.totalPages = res.datas.total_page;
        }
      });
    });
  }

  loadData() {
    let params = new HttpParams();
    params = params.append('appid', 'test');
    params = params.append('appkey', 'on');
    params = params.append('apptype', 'desktop');
    params = params.append('token', this.cnf.token);
    params = params.append('lang', this.cnf.lang);
    params = params.append('page', this.currentPage);
    params = params.append('per_page', this.perPage);
    params = params.append('attoken', this.attoken);

    return this.http.get(this.cnf.URLWSNonPublicArea + '/inbox_blast/frontend/userid/' + this.userId, { params })
      .map((response: Response) => response);
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

  selectAll() {
    for (var i = 0; i < this.inboxData.length; i++) {
      this.inboxData[i].selected = this.selectedAll;
    }
  }

  checkIfAllSelected() {
    this.selectedAll = this.inboxData.every(function (item: any) {
      return item.selected == true;
    })
  }

  doDelete() {
    this.deleteData(0);
    this.auditTrail.saveLog('Inbox', 'Delete All Inbox');
  }

  deleteData(i) {
    let dataTemp = this.inboxData[i];
    if (dataTemp.selected == true) {
      this.loadDeleteData(dataTemp.id).subscribe((res: any) => {
        if ((i + 1) == this.inboxData.length) {
          this.cnf.getAttoken().subscribe((res: any) => {
            if (res.status == 100) {
              this.attoken = this.cnf.generateAttoken(this.projectName, res.datas);
            }
            this.loadData().subscribe((res: any) => {
              this.inboxData = [];
              this.loadingData = true;
    
              if (res.status == 100) {
                this.inboxData = res.datas.inbox;
                this.total = res.datas.total;
                this.totalPages = res.datas.total_page;
              }
            });
          });
        }else{
          let x = i+1;
          this.deleteData(x);
        }
      });
    } else {
      if ((i + 1) == this.inboxData.length) {
        this.cnf.getAttoken().subscribe((res: any) => {
          if (res.status == 100) {
            this.attoken = this.cnf.generateAttoken(this.projectName, res.datas);
          }
          this.loadData().subscribe((res: any) => {
            this.inboxData = [];
            this.loadingData = true;

            if (res.status == 100) {
              this.inboxData = res.datas.inbox;
              this.total = res.datas.total;
              this.totalPages = res.datas.total_page;
            }
          });
        });
      } else {
        let x = i + 1;
        this.deleteData(x);
      }
    }
  }

}
