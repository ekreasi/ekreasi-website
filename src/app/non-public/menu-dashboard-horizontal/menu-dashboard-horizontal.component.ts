import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Config } from '../../config';
import { HttpClient } from "@angular/common/http";
import swal from 'sweetalert2';

@Component({
  selector: 'menu-dashboard-horizontal',
  templateUrl: './menu-dashboard-horizontal.component.html',
  styleUrls: ['./menu-dashboard-horizontal.component.scss']
})
export class MenuDashboardHorizontalComponent implements OnInit {
  isCollapsed: boolean;
  constructor(private router: Router, private cnf: Config, private http: HttpClient) {
    this.isCollapsed = true;
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

  addCloseClass() {
    var x = document.getElementById("burger-bottom");
    x.classList.toggle("change");
  }

}
