import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MouseEvent } from '@agm/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Config } from '../../config';
import { AuditTrail } from './../../audit-trail';
import { Title } from '@angular/platform-browser';
import { CacheService } from '../../cache.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgxCarousel } from 'ngx-carousel';
import { UserInternal, ContactForm } from './../../validation';
import { SwalComponent } from '@toverux/ngx-sweetalert2';
import * as CryptoJS from 'crypto-js';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  providers: [Config, AuditTrail],
  encapsulation: ViewEncapsulation.None
})

export class ContactComponent implements OnInit {
  @ViewChild('swal') private swal: SwalComponent;
  @ViewChild('captchaRef') private captchaRef;

  public loadingButton: boolean = false;
  public data: any = {};
  public loadingData: boolean = false;
  public preview: any = '';
  public token: any = '';
  public contactForm: ContactForm;
  public swalData: any = {};
  attoken: string = '';
  projectName: string = 'agent';

  public zoom: number = 15;
  public lat: number;
  public lng: number;
  public markers: marker[];
  googleRecaptchaKey: string;
  public contactLocation: any = [];

  constructor(private cnf: Config, private auditTrail: AuditTrail, private titleService: Title, private http: HttpClient, private cacheService: CacheService, private route: ActivatedRoute, private translate: TranslateService) {
    this.route.queryParams.subscribe(params => {
      this.preview = params['preview'];
      this.token = params['token'];
    });
  }

  ngOnInit() {
    this.googleRecaptchaKey = this.cnf.googleRecaptchaKey;
    this.contactForm = new ContactForm({
      name: '',
      email: '',
      category: '',
      phone: '',
      subject: '',
      message: '',
      captcha: '',
      location: '',
    });

    this.cnf.getAttoken().subscribe((res: any) => {
      if (res.status == 100) {
        this.attoken = this.cnf.generateAttoken(this.projectName, res.datas);
      }

      this.cacheService.get(this.cnf.lang + '/contact', this.loadData()).subscribe((res: any) => {
        this.loadingData = true;
        if (res.status == 100) {
          this.data = JSON.parse(this.cnf.decryptData(res.datas));
          this.titleService.setTitle(this.cnf.prefixTitle + this.data.title + this.cnf.postfixTitle);

          this.lat = Number(this.data.lat);
          this.lng = Number(this.data.long);
          this.markers = [
            {
              lat: this.data.lat,
              lng: this.data.long
            },
          ];
        }
      });
      this.cacheService.get(this.cnf.lang + '/agent_location_data/', this.loadDataAgentLocation()).subscribe((res: any) => {
        if (res.status == 100) {
          let decryptData = JSON.parse(this.cnf.decryptData(res.datas));
          this.contactLocation = decryptData[0].agent;
        }
      });
    });
  }

  resolved(captchaResponse: string) {
    this.contactForm.captcha = captchaResponse;
  }

  loadData() {
    let params = new HttpParams();
    params = params.append('appid', this.cnf.appid);
    params = params.append('appkey', this.cnf.appkey);
    params = params.append('lang', this.cnf.lang);

    let url = this.cnf.URLWS + '/contact';
    if (this.preview) {
      params = params.append('token', this.token);
      url = url + '/preview/' + this.preview;
    } else {
      url = url + '/frontend/all';
    }


    return this.http.get(url, { params })
      .map((response: Response) => response);
  }

  loadDataAgentLocation() {
    let params = new HttpParams();
    params = params.append('appid', 'test');
    params = params.append('appkey', 'on');
    params = params.append('apptype', 'desktop');
    params = params.append('token', this.cnf.token);
    params = params.append('lang', this.cnf.lang);
    params = params.append('search', '');
    params = params.append('attoken', this.attoken);

    return this.http.get(this.cnf.URLWSNonPublicArea + '/agent/data/location', { params })
      .map((response: Response) => response);
  }

  onInternalSubmit(form: any) {
    if (this.contactForm.category.toLowerCase().indexOf('prod') == -1) {
      this.contactForm.location = '';
    }
    let data = {
      "email": this.contactForm.email,
      "phone": this.contactForm.phone,
      "message": this.contactForm.message,
      "categoryId": this.contactForm.category,
      "subject": this.contactForm.subject,
      "name": this.contactForm.name,
      "captcha": this.contactForm.captcha,
      "location": this.contactForm.location
    };
    let params = new HttpParams();
    params = params.append('appid', this.cnf.appid);
    params = params.append('appkey', this.cnf.appkey);

    this.loadingButton = true;

    this.http.post(this.cnf.URLWS + '/inbox/frontend/contactus', data, { params }).subscribe((res: any) => {
      this.loadingButton = false;
      this.captchaRef.reset();

      if (res.status == 100) {
        let message = this.translate.instant('_success_contact_us_send');

        this.swalData = {
          "title": "Success",
          "message": message,
          "type": "success"
        };
        this.showSwal();

        form.resetForm();
        this.contactForm = new ContactForm({
          name: '',
          email: '',
          category: '',
          phone: '',
          subject: '',
          message: '',
          captcha: '',
          location: '',
        });

      } else {
        let oops = this.translate.instant('_oops');
        this.swalData = {
          "title": oops,
          "message": res.message,
          "type": "error"
        };
        this.showSwal();
      }
    });
  }

  showSwal() {
    setTimeout(() => {
      this.swal.show();
    }, 100);
  }
}

interface marker {
  lat: number;
  lng: number;
}