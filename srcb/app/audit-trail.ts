import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Config } from './config';
import { HttpClient, HttpParams } from "@angular/common/http";

@Injectable()
export class AuditTrail {
    constructor(
        private http: HttpClient,
        private router: Router,
        private cnf: Config
    ) { }

    saveLog(menuName, menuAction) {
        let params = new HttpParams();
        params = params.append('appid', this.cnf.appid);
        params = params.append('appkey', this.cnf.appkey);
        params = params.append('token', this.cnf.token);
        this.http.get(this.cnf.URLWS + '/audit_trail_front_end/getToken', { params }).subscribe((res: any) => {
            let decrypt = this.cnf.decryptData(res.datas);
            let attoken = this.cnf.encryptData(menuName + '|' + menuAction + '|' + decrypt);

            let params = new HttpParams();
            params = params.append('appid', this.cnf.appid);
            params = params.append('appkey', this.cnf.appkey);
            params = params.append('token', this.cnf.token);
            params = params.append('attoken', attoken);

            let data = {
                "menuName": menuName,
                "menuAction": menuAction
            };

            this.http.post(this.cnf.URLWS + '/audit_trail_front_end/frontend/audittrail/save', data, { params }).subscribe((res: any) => {

            });
        });
    }
}