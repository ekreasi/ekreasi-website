import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Config } from '../../config';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
	providers: [ Config ]
})
export class NewsComponent implements OnInit {
  totalPages: any;
  total: any;
  perPage: any = '4';
  currentPage: any = '1';
  previousPage: any;
  data: any = {};

  constructor( private cnf: Config, private http:HttpClient ) {}

  ngOnInit() {
    this.loadData();
  }

  loadPage(page: string) {
    if (page !== this.previousPage) {
      this.previousPage = page;
      this.currentPage = page;
      this.loadData();
    }
  }

  loadData(){
    this.http.get( this.cnf.URLWS + '/news/frontend/all?appid=test&apptype=web&page=' + this.currentPage + '&per_page=' + this.perPage + '&lang=' + this.cnf.lang)
    .subscribe(
      (res:any) => {
        if (res.status == 100) {
          let datas = res.datas;
          this.data = datas;
          this.total = datas.total;
          this.totalPages = datas.total_pages;
          this.perPage = datas.per_page;
          this.currentPage = datas.current_page;
        }
      },
      response => {
        console.log("GET call in error", response);
      },
      () => {
        console.log("The GET observable is now completed.");
      }
    );
  }
    
}
