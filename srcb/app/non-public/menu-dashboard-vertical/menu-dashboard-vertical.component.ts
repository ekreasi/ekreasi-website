import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { Config } from '../../config';
import { HttpClient, HttpParams } from "@angular/common/http";

@Component({
  selector: 'menu-dashboard-vertical',
  templateUrl: './menu-dashboard-vertical.component.html',
  styleUrls: ['./menu-dashboard-vertical.component.scss']
})
export class MenuDashboardVerticalComponent implements OnInit {

  constructor(  private router: Router, private cnf: Config, private http: HttpClient ){
  }

  ngOnInit() {
  }

  // doLogout(){
  //   localStorage.clear();
  //   this.router.navigate(['/']);
  // }

  doLogout() {
    var url = this.cnf.URLWSNonPublicArea + '/user_frontend/logout?appid=' + this.cnf.appid + '&appkey=' + this.cnf.appkey + '&token=' + this.cnf.token;
      this.http.get(url).subscribe(res => {
        localStorage.clear();
        this.router.navigate(['/']);
      });
  }

}
