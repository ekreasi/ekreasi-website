import { Component, OnInit, ViewChild } from '@angular/core';
import { UserInternal } from '../../validation';
import { SwalComponent } from '@toverux/ngx-sweetalert2';
import { Config } from '../../config'; 
import { AuditTrail } from './../../audit-trail';
import { Title } from '@angular/platform-browser';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
	providers: [ Config, AuditTrail ]
})
export class LoginComponent implements OnInit {
  @ViewChild('loginErrorSwal') private loginErrorSwal: SwalComponent;
  @ViewChild('errorActivationNotFoundSwal') private errorActivationNotFoundSwal: SwalComponent;

  public userInternal:UserInternal;
  public loadingSignin : boolean = false;
  public personalData: any = {};
  public userId: any = '';
  activation: string = '';
  errorMessage: string;

  constructor( private cnf: Config, 
    private auditTrail: AuditTrail, 
    private titleService: Title, 
    private http:HttpClient, 
    private router: Router, 
    private translate: TranslateService,
    private route: ActivatedRoute 
  ) {
    this.route.queryParams.subscribe(params => {
      this.activation = params['activation'];

      if(this.activation == 'expired'){        
        setTimeout(() => {
          let message = this.translate.instant('_activation_not_found');
          this.showErrorNotFoundMessage(message);
        }, 500);
      }
    });
  }

  ngOnInit() {
    this.titleService.setTitle( this.cnf.prefixTitle + "Login" + this.cnf.postfixTitle );

    localStorage.clear();
    this.userInternal = new UserInternal({email:"", password:""})
  }
  onInternalSubmit({ 
    value, valid }: { value: UserInternal, valid: boolean }) {
    this.userInternal = value;
    this.loadingSignin = true;

    let params = new HttpParams();
    params = params.append('appid', this.cnf.appid);
    params = params.append('appkey', this.cnf.appkey);
    let data = {
      'userId': this.userInternal.email,
      'password' : this.cnf.md5(this.userInternal.password)
    };
      
    this.http.post(this.cnf.URLWSNonPublicArea + '/user_frontend/login', data, { params }).subscribe((res:any) => {
      
      if (res.status == 100) {
        this.userId = res.datas.userId;
        localStorage.setItem("token", res.token);
        localStorage.setItem("userid", res.datas.userId);
        localStorage.setItem("lastLogin", res.datas.lastLogin);
        this.cnf.token = res.token;
        this.auditTrail.saveLog("Login", "Login");

        this.loadPersonalData().subscribe((res:any) => {
          let decryptData = JSON.parse(this.cnf.decryptData(res.datas));
          this.personalData = decryptData[0].personalData[0];
          localStorage.setItem('userData', this.cnf.encryptData( JSON.stringify(this.personalData)) );

          this.loadingSignin = false;
          this.router.navigate(['/dashboard']);
        });
      } else {
        this.loadingSignin = false;
        this.loginErrorSwal.show();
      }
    });
  }

  loadPersonalData(){
    let params = new HttpParams();
    params = params.append('appid', 'test'); params = params.append('appkey', 'on');
    params = params.append('apptype', 'desktop');
    // params = params.append('token', '3425');
    params = params.append('token', this.cnf.token);
    params = params.append('lang', this.cnf.lang);

    return this.http.get( this.cnf.URLWSNonPublicArea + '/personal_data/data/userid/' + this.userId, {params} )
      .map((response: Response) => response);
  }
  
  showErrorNotFoundMessage(message: string) {
    this.errorMessage = message;
    setTimeout(() => {
      this.errorActivationNotFoundSwal.show();
    }, 100);
  }
}
