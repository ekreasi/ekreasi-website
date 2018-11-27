import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { ChangePassword } from '../../validation';
import { Config } from '../../config';
import { AuditTrail } from './../../audit-trail';
import { Title } from '@angular/platform-browser';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SwalComponent } from '@toverux/ngx-sweetalert2';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
  providers: [Config, AuditTrail]
})
export class ChangePasswordComponent implements OnInit {
  @ViewChild('successChangePassword') private successChangePassword: SwalComponent;
  @ViewChild('errorChangePassword') private errorChangePassword: SwalComponent;
  @ViewChild('captchaRef') private captchaRef;

  public changePassword: ChangePassword;
  public barLabel: string = "Password strength:";
  public myColors = ['#DD2C00', '#FF6D00', '#FFD600', '#AEEA00', '#00C853'];
  public loadingButton: boolean = false;
  public errorMessage: any;
  public passwordPattern: any = '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$';
  public googleRecaptchaKey: any = '';

  constructor(private cnf: Config, private auditTrail: AuditTrail, private titleService: Title, private http: HttpClient, private _location: Location, private translate: TranslateService) { }

  ngOnInit() {
    this.googleRecaptchaKey = this.cnf.googleRecaptchaKey;
    this.auditTrail.saveLog("Account Setting Change Password", "Open");
    this.titleService.setTitle(this.cnf.prefixTitle + "Change Password" + this.cnf.postfixTitle);

    this.changePassword = new ChangePassword({ currentPassword: "", newPassword: "", retypePassword: "", captcha: "" });
  }

  onInternalSubmit(form: NgForm) {
    let passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/;

    if (this.changePassword.currentPassword == '') {
      this.showErrorMessage('Password saat ini tidak boleh kosong');
    } else if (this.changePassword.newPassword == '') {
      this.showErrorMessage('Password baru tidak boleh kosong');
    } else if (this.changePassword.retypePassword == '') {
      this.showErrorMessage('Ulangi password tidak boleh kosong');
    } else if (this.changePassword.retypePassword != this.changePassword.newPassword) {
      this.showErrorMessage('Ulangi password tidak boleh kosong');
    } else if (!passwordRegex.test(this.changePassword.newPassword)) {
      this.showErrorMessage('Password harus berisi minimal 8 digit, huruf besar, huruf kecil, angka dan spesial karakter');
    } else {
      this.loadingButton = true;

      let params = new HttpParams();
      params = params.append('appid', this.cnf.appid);
      params = params.append('appkey', this.cnf.appkey);
      params = params.append('userid', this.cnf.userId);
      params = params.append('token', this.cnf.token);
      params = params.append('lang', this.cnf.lang);
      params = params.append('currentpassword', this.changePassword.currentPassword);
      params = params.append('password', this.changePassword.newPassword);
      params = params.append('repassword', this.changePassword.retypePassword);
      params = params.append('captcha', this.changePassword.captcha);

      this.http.get(this.cnf.URLWSNonPublicArea + '/user_frontend/updatePass', { params }).subscribe((res: any) => {
        this.loadingButton = false;
        this.captchaRef.reset();

        if (res.status == 100) {
          this.changePassword = new ChangePassword({ currentPassword: "", newPassword: "", retypePassword: "" });
          form.resetForm();
          this.successChangePassword.show();
        } else {
          let message = this.translate.instant(res.message);
          this.showErrorMessage(message);
        }
      });
    }
    this.auditTrail.saveLog("Account Setting Change Password", "Submit Reset Password");
  }

  resolved(captchaResponse: string) {
    this.changePassword.captcha = captchaResponse;
  }

  showErrorMessage(message: string) {
    this.errorMessage = message;
    setTimeout(() => {
      this.errorChangePassword.show();
    }, 100);
  }

  backClicked() {
    this._location.back();
  }

}
