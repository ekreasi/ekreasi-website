import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { Config } from '../../config';

@Component({
  selector: 'app-detail-news',
  templateUrl: './detail-news.component.html',
  styleUrls: ['./detail-news.component.scss'],
	providers: [ Config ]
})
export class DetailNewsComponent implements OnInit {
  params : any;
  data : any = {};

  constructor( private route: ActivatedRoute, private cnf: Config, private http:HttpClient ) {
    this.route.params.subscribe( params => this.params = params );
  }

  ngOnInit() {
    this.http.get( this.cnf.URLWS + '/news/frontend/byid/'+this.params.id+'?appid=test&apptype=web&lang=' + this.cnf.lang)
		.subscribe(
      (res:any) => {
        if(res.status == 100){
          this.data = res.datas;
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
