import { Component, OnInit, ViewChild } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { Config } from '../../config';
import { AuditTrail } from './../../audit-trail';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { UserActivation } from './../../validation';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CacheService } from '../../cache.service';
import { SwalComponent } from '@toverux/ngx-sweetalert2';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-activation',
  templateUrl: './activation.component.html',
  styleUrls: ['./activation.component.scss'],
  providers: [Config, AuditTrail]
})
export class ActivationComponent implements OnInit {
  errorMessage: string;
  @ViewChild('successActivationSwal') private successActivationSwal: SwalComponent;
  @ViewChild('errorActivationSwal') private errorActivationSwal: SwalComponent;
  @ViewChild('errorActivationNotFoundSwal') private errorActivationNotFoundSwal: SwalComponent;
  @ViewChild('activationTimeoutSwal') private activationTimeoutSwal: SwalComponent;
  @ViewChild('captchaRef') private captchaRef;

  params: any;
  userActivation: UserActivation;
  isOTP: boolean = false;
  loadingButton: boolean = false;
  otpCode: any = '';
  handphone: any = '';
  activationCountdown: any;
  resendActivationCountdown: any = new Date();
  resendActivationButton: any = true;
  isActivationPopup: any = true;
  isResendActivationTimeout: any = true;
  activationTime: any = 5;
  resendOtpCodeTime: any = 1;
  public barLabel: string = "Password strength:";
  public myColors = ['#DD2C00', '#FF6D00', '#FFD600', '#AEEA00', '#00C853'];
  passwordPattern: any = '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$';
  public googleRecaptchaKey: any = '';
  termOfUseLink: any = '';
  otpResponse: any = {};

  activation: string = '';
  returnUrl: string = '';

  constructor(
    private cnf: Config,
    private auditTrail: AuditTrail,
    private titleService: Title,
    private route: ActivatedRoute,
    private http: HttpClient,
    private cacheService: CacheService,
    private router: Router,
    private translate: TranslateService
  ) {
    this.route.params.subscribe(params => {
      this.params = params;
      this.activation = params['activation'];
    });
  }

  ngOnInit() {
    this.termOfUseLink = '/term-of-use';
    this.googleRecaptchaKey = this.cnf.googleRecaptchaKey;
    
    let currentLang = localStorage.getItem('lang');
    localStorage.clear();
    localStorage.setItem('lang', currentLang);
    this.userActivation = new UserActivation({
      activationCode: "",
      userId: "",
      email: "",
      password: "",
      retypePassword: "",
      otpCode: "",
      captcha: "",
      tickTerms: "",
      type: ""
    });

    let decodeString = atob(this.params.activationId);

    let key = CryptoJS.enc.Utf8.parse(this.cnf.encryptKey);
    let decrypted = CryptoJS.AES.decrypt(decodeString, key,
      {
        keySize: 128 / 8,
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
      }).toString(CryptoJS.enc.Utf8);

    let decryptData = JSON.parse(decrypted);

    this.userActivation.userId = decryptData.userId;
    this.userActivation.activationCode = decryptData.activationCode;
    this.userActivation.type = ( decryptData.type ? decryptData.type : '' );
    if( this.userActivation.type !='forgotpassword'){
      this.titleService.setTitle(this.cnf.prefixTitle + 'Activation' + this.cnf.postfixTitle);
    }else{
      this.titleService.setTitle(this.cnf.prefixTitle + 'Forgot Password' + this.cnf.postfixTitle);
    }
  }

  ngAfterViewInit() {
    this.checkActivation().subscribe((res: any) => {
      if (res.status != 100) {
        this.router.navigate(['/auth/login'], { queryParams: { activation: 'expired' } });
      }
    });
  }

  onInternalSubmit({ value, valid }: { value: UserActivation, valid: boolean }) {
    this.loadingButton = true;
    let passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/;

    if (!this.userActivation.email || !this.userActivation.password || !this.userActivation.retypePassword) {
      this.showErrorMessage('Input form masih ada yang kosong');
      this.loadingButton = false;
    } else {
      if (!passwordRegex.test(this.userActivation.password)) {
        this.showErrorMessage('Password harus berisi minimal 8 digit, huruf besar, huruf kecil, dan angka');
        this.loadingButton = false;
      } else if (this.userActivation.password != this.userActivation.retypePassword) {
        this.showErrorMessage('Password yang Anda isi masih belum sama');
        this.loadingButton = false;
      } else {
        this.sendRequestOtp("false").subscribe((res: any) => {
          // this.captchaRef.reset();
          this.loadingButton = false;
          if (res.status == 100) {
            window.scrollTo(0, 0);
            this.otpResponse = res.datas;
            this.isOTP = true;

            this.activationCountdown = new Date().setMinutes(new Date().getMinutes() + this.activationTime);
            this.resendActivationCountdown = new Date().setMinutes(new Date().getMinutes() + this.resendOtpCodeTime);
          } else {
            let message = this.translate.instant(res.message);
            this.showErrorMessage(message);
          }
        });
      }
    }
  }

  submitActivation() {
    if (this.userActivation.otpCode) {
      this.loadingButton = true;

      this.sendActivation().subscribe((res: any) => {
        this.loadingButton = false;

        if (res.status == 100) {
          this.successActivationSwal.show();
          this.router.navigate(['/auth/login'], { queryParams: { activation: 'success' } });
        } else {
          let message = this.translate.instant(res.message);
          this.showErrorMessage(message);
        }
      });
    } else {
      this.errorActivationSwal.show();
    }
  }

  resolved(captchaResponse: string) {
    this.userActivation.captcha = captchaResponse;
  }

  sendActivation() {
    let params = new HttpParams();
    params = params.append('appid', this.cnf.appid);
    params = params.append('appkey', this.cnf.appkey);
    params = params.append('userid', this.userActivation.userId);
    params = params.append('activationid', this.userActivation.activationCode);
    params = params.append('otp', this.userActivation.otpCode);
    params = params.append('email', this.userActivation.email);
    params = params.append('password', this.userActivation.password);
    params = params.append('repassword', this.userActivation.retypePassword);
    params = params.append('type', this.userActivation.type);

    return this.http.get(this.cnf.URLWSNonPublicArea + '/user_frontend/activation', { params })
      .map((response: Response) => response);
  }

  checkActivation() {
    let params = new HttpParams();
    params = params.append('appid', this.cnf.appid);
    params = params.append('appkey', this.cnf.appkey);
    params = params.append('userid', this.userActivation.userId);
    params = params.append('activationid', this.userActivation.activationCode);

    return this.http.get(this.cnf.URLWSNonPublicArea + '/user_frontend/checkActivation', { params })
      .map((response: Response) => response);
  }

  sessionExpired() {
    let params = new HttpParams();
    params = params.append('appid', this.cnf.appid);
    params = params.append('appkey', this.cnf.appkey);
    params = params.append('userid', this.userActivation.userId);
    params = params.append('activationid', this.userActivation.activationCode);

    return this.http.get(this.cnf.URLWSNonPublicArea + '/user_frontend/sessionExpired', { params })
      .map((response: Response) => response);
  }

  sendRequestOtp(resend) {
    let params = new HttpParams();
    params = params.append('appid', this.cnf.appid);
    params.append('appkey', this.cnf.appkey);
    params = params.append('userid', this.userActivation.userId);
    params = params.append('activationid', this.userActivation.activationCode);
    params = params.append('email', this.userActivation.email);
    params = params.append('captcha', this.userActivation.captcha);
    params = params.append('password', this.userActivation.password);
    params = params.append('repassword', this.userActivation.retypePassword);
    params = params.append('type', this.userActivation.type);
    params = params.append('resend', resend);

    return this.http.get(this.cnf.URLWSNonPublicArea + '/user_frontend/requestOTP', { params })
      .map((response: Response) => response);
  }

  resendRequestOtp() {
    this.resendActivationButton = true;
    this.sendRequestOtp("true").subscribe((res: any) => {
      this.otpResponse.totalRequestOtp = this.otpResponse.totalRequestOtp + 1;
      this.isResendActivationTimeout = true;
      this.resendActivationCountdown = new Date().setMinutes(new Date().getMinutes() + 1);
    });
  }

  enableResendButton() {
    this.isResendActivationTimeout = false;
    this.resendActivationButton = false;

    if (this.otpResponse.totalRequestOtp >= this.otpResponse.maxRequestOtp) {
      this.returnUrl = '/';
      let message = this.translate.instant('_session_expired');
      this.showErrorNotFoundMessage(message);
    }
  }

  activationTimeout() {
    if (this.isActivationPopup == true) {
      this.returnUrl = '/';
      this.isActivationPopup = false;
      this.sessionExpired().subscribe();
      let message = this.translate.instant('_session_expired');
      this.showErrorNotFoundMessage(message);
    }
  }

  showErrorMessage(message: string) {
    this.errorMessage = message;
    setTimeout(() => {
      this.errorActivationSwal.show();
    }, 100);
  }

  showErrorNotFoundMessage(message: string) {
    this.errorMessage = message;
    setTimeout(() => {
      this.errorActivationNotFoundSwal.show();
    }, 100);
  }

  doGoHome($event) {
    this.router.navigate([ this.returnUrl ]);
  }
}
