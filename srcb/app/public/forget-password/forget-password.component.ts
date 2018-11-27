import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit, ViewChild } from '@angular/core';
import { UserForgot } from '../../validation';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Config } from '../../config';
import { AuditTrail } from './../../audit-trail';
import { Title } from '@angular/platform-browser';
import { CacheService } from '../../cache.service';
import { SwalComponent } from '@toverux/ngx-sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss'],
  providers: [Config, AuditTrail]
})
export class ForgetPasswordComponent implements OnInit {
  @ViewChild('errorForgetPassword') private errorForgetPassword: SwalComponent;
  @ViewChild('successForgetPassword') private successForgetPassword: SwalComponent;
  @ViewChild('captchaRef') private captchaRef;

  message: string;
  secretQuestionsData: any = [];
  isQuestion: boolean;
  loadingButton: boolean = false;
  userForgot: UserForgot;
  googleRecaptchaKey: string;
  responseEmail: string = '';

  constructor(
    private cnf: Config, private auditTrail: AuditTrail, private titleService: Title,
    private http: HttpClient,
    private cacheService: CacheService,
    private router: Router,
    private translate: TranslateService
  ) {

  }

  ngOnInit() {
    this.googleRecaptchaKey = this.cnf.googleRecaptchaKey;
    this.titleService.setTitle(this.cnf.prefixTitle + "Forget Password" + this.cnf.postfixTitle);
    this.userForgot = new UserForgot({
      email: "",
      otpCode: "",
      captcha: "",
    });
  }

  onInternalSubmit({ value, valid }: { value: UserForgot, valid: boolean }) {
    if (this.userForgot.email) {
      this.loadingButton = true;

      this.sendEmailValidation().subscribe((res: any) => {
        this.captchaRef.reset();
        this.loadingButton = false;
        if (res.status == 100) {
          this.responseEmail = res.datas.email;
        } else {
          let message = this.translate.instant(res.message);
          this.showErrorMessage(message);
        }
      });
    } else {
      this.showErrorMessage("Maaf, email yang Anda masukkan masih kosong");
    }
  }

  resolved(captchaResponse: string) {
    this.userForgot.captcha = captchaResponse;
  }

  sendEmailValidation() {
    let params = new HttpParams();
    params = params.append('appid', this.cnf.appid);
    params = params.append('appkey', this.cnf.appkey);
    params = params.append('email', this.userForgot.email);
    params = params.append('captcha', this.userForgot.captcha);

    return this.http.get(this.cnf.URLWSNonPublicArea + '/user_frontend/emailValidation', { params })
      .map((response: Response) => response);
  }

  showSuccessMessage(message: string) {
    this.message = message;
    setTimeout(() => {
      this.successForgetPassword.show();
    }, 100);
  }

  showErrorMessage(message: string) {
    this.message = message;
    setTimeout(() => {
      this.errorForgetPassword.show();
    }, 100);
  }
}
