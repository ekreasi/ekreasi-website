import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Location } from '@angular/common';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Config } from '../../config';
import { AuditTrail } from './../../audit-trail';
import { Title } from '@angular/platform-browser';
import { CacheService } from '../../cache.service';
import { forEach } from '@angular/router/src/utils/collection';
import * as CryptoJS from 'crypto-js';
import { OrderPipe } from 'ngx-order-pipe';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { NgbDateFRParserFormatter } from '../../ngb-date-fr-parser-formatter';

@Component({
  selector: 'app-unit-price',
  templateUrl: './unit-price.component.html',
  styleUrls: ['./unit-price.component.scss'],
  providers: [Config, AuditTrail, { provide: NgbDateParserFormatter, useClass: NgbDateFRParserFormatter }]
})
export class UnitPriceComponent implements OnInit {
  // note : h1 = endDate, h2= startDate
  page = 4;
  params: any;
  fundNameData: any = [];
  h1: any = [];
  h2: any = [];
  dailyNavData: any = [];
  percentage: any;
  dateStart: any;
  dateEnd: any;
  modelStart;
  modelEnd;
  disableModelStart;
  disableModelEnd;
  modelFundName: any = "";
  public loadingData: boolean = false;
  public userId: any = '';
  order: string = 'percentage';
  reverse: boolean = false;
  attoken: string = '';
  projectName: string = 'fund';
  maxDate: any = {};

  constructor(private route: ActivatedRoute, private cnf: Config, private auditTrail: AuditTrail, private titleService: Title, private http: HttpClient, private cacheService: CacheService, private _location: Location, private orderPipe: OrderPipe) {
    this.route.params.subscribe(params => this.params = params);
  }

  ngOnInit() {
    this.auditTrail.saveLog("Fund Unit Price", "Open");
    this.titleService.setTitle(this.cnf.prefixTitle + "Unit Price" + this.cnf.postfixTitle);

    this.userId = localStorage.getItem('userid');
    this.cnf.getAttoken().subscribe((res: any) => {
      if (res.status == 100) {
        this.attoken = this.cnf.generateAttoken(this.projectName, res.datas);
      }
      this.cacheService.get(this.cnf.lang + '/fund_name/', this.loadFundName()).subscribe((res: any) => {
        let decryptData = JSON.parse(this.cnf.decryptData(res.datas));

        this.fundNameData = decryptData[0].fund_fact_name;
        this.loadingData = true;
        this.doGetSearch();
      });

      this.loadH1().subscribe((res: any) => {
        let decryptData = JSON.parse(this.cnf.decryptData(res.datas));

        this.h1 = decryptData[0].fund_daily_nav;

        this.loadH2().subscribe((res: any) => {
          let decryptData = JSON.parse(this.cnf.decryptData(res.datas));

          this.h2 = decryptData[0].fund_daily_nav;
          let h1 = this.h1;
          let h2 = this.h2;
          this.loadMerge(h1, h2);
        });
      });
    });
  }

  doSaveSearch() {
    localStorage.setItem("unitPrice_modelFundNamePriceUnit", this.modelFundName);
    localStorage.setItem("unitPrice_modelStartPriceUnit", JSON.stringify(this.modelStart));
    localStorage.setItem("unitPrice_modelEndPriceUnit", JSON.stringify(this.modelEnd));
  }

  doGetSearch() {
    this.modelFundName = (localStorage.getItem("unitPrice_modelFundNamePriceUnit") ? localStorage.getItem("unitPrice_modelFundNamePriceUnit") : '');
    this.modelStart = (localStorage.getItem("unitPrice_modelStartPriceUnit") && localStorage.getItem("unitPrice_modelStartPriceUnit") != "" ? JSON.parse(localStorage.getItem("unitPrice_modelStartPriceUnit")) : this.modelStart);
    this.modelEnd = (localStorage.getItem("unitPrice_modelEndPriceUnit") && localStorage.getItem("unitPrice_modelEndPriceUnit") != "" ? JSON.parse(localStorage.getItem("unitPrice_modelEndPriceUnit")) : this.modelEnd);
    
    if(this.modelFundName !='' || this.modelStart != this.disableModelStart || this.modelEnd != this.disableModelEnd){
      this.doSearch();
    }
  }

  loadMerge(endDate, startDate) {
    let output = [];

    for (var i in endDate) {
      let dataEndDate = endDate[i];

      for (var i in startDate) {
        let dataStartDate = startDate[i];

        if (dataEndDate.fundName == dataStartDate.fundName) {
          let dataStartDateSplit = dataStartDate.pricingDate.split('-');
          let dataEndDateSplit = dataEndDate.pricingDate.split('-');
          this.dateStart = new Date(parseInt(dataStartDateSplit[0]), parseInt(dataStartDateSplit[1]) - 1, parseInt(dataStartDateSplit[2])); // yy,mm-1,dd
          this.dateEnd = new Date(parseInt(dataEndDateSplit[0]), parseInt(dataEndDateSplit[1]) - 1, parseInt(dataEndDateSplit[2]));

          this.modelStart = {
            'day': this.dateStart.getDate(),
            'month': this.dateStart.getMonth() + 1,
            'year': this.dateStart.getFullYear(),
          };
          this.modelEnd = {
            'day': this.dateEnd.getDate(),
            'month': this.dateEnd.getMonth() + 1,
            'year': this.dateEnd.getFullYear(),
          };

          this.disableModelStart = this.modelStart;
          this.disableModelEnd = this.modelEnd;

          let rumus = ((dataEndDate.bidPrice - dataStartDate.bidPrice) / dataStartDate.bidPrice) * 100;
          let percentageResult = Math.round(rumus * 10000) / 10000;

          output.push({
            'fundName': dataEndDate.fundName,
            'pricingDateStart': dataStartDate.pricingDate,
            'pricingDateEnd': dataEndDate.pricingDate,
            'bidPriceDateStart': Number(dataStartDate.bidPrice),
            'bidPriceDateEnd': Number(dataEndDate.bidPrice),
            'percentage': percentageResult,
            'moneyCode': dataEndDate.moneyCode,
          })
        }
      }
    }
    this.doGetSearch();
    this.dailyNavData = this.orderPipe.transform(output, 'percentage');
  }

  loadMergeSearch(dateStart, dateEnd, results) {
    this.dailyNavData = [];
    let output = [];

    for (let i in this.fundNameData) {
      let fundNameTemp = this.fundNameData[i];
      output.push({
        'fundName': fundNameTemp,
        'pricingDateStart': '',
        'pricingDateEnd': '',
        'bidPriceDateStart': '',
        'bidPriceDateEnd': '',
        'percentage': '',
        'moneyCode': '',
      });
      for (let x in results) {
        let resultTemp = results[x];
        resultTemp.pricingDate = resultTemp.pricingDate.replace(' 00:00:00.0', '');

        if (resultTemp.fundName == fundNameTemp && resultTemp.pricingDate == dateStart) {
          output[i].pricingDateStart = resultTemp.pricingDate;
          output[i].bidPriceDateStart = resultTemp.bidPrice;
          output[i].moneyCode = resultTemp.moneyCode;
        }
        if (resultTemp.fundName == fundNameTemp && resultTemp.pricingDate == dateEnd) {
          output[i].pricingDateEnd = resultTemp.pricingDate;
          output[i].bidPriceDateEnd = resultTemp.bidPrice;
        }
      }
    }

    let finalOutput = [];
    let filterName = (this.modelFundName ? true : false);
    for (let i in output) {
      if (output[i].bidPriceDateStart) {
        let outputTemp = output[i];

        if (filterName && this.modelFundName != output[i].fundName) {
          continue;
        }

        let rumus = ((outputTemp.bidPriceDateEnd - outputTemp.bidPriceDateStart) / outputTemp.bidPriceDateStart) * 100;
        let percentageResult = Math.round(rumus * 10000) / 10000;

        finalOutput.push({
          'fundName': outputTemp.fundName,
          'pricingDateStart': outputTemp.pricingDateStart,
          'pricingDateEnd': outputTemp.pricingDateEnd,
          'bidPriceDateStart': Number(outputTemp.bidPriceDateStart),
          'bidPriceDateEnd': Number(outputTemp.bidPriceDateEnd),
          'percentage': percentageResult,
          'moneyCode': outputTemp.moneyCode
        });
      }
    }

    this.dailyNavData = this.orderPipe.transform(finalOutput, 'percentage');
  }

  doSearch() {
    this.doSaveSearch();
    this.auditTrail.saveLog("Fun Unit Price", "Search");
    this.loadingData = false;
    let start = this.modelStart;
    let end = this.modelEnd;
    let dateStartFormat = start.year + '-' + ('0' + start.month).slice(-2) + '-' + ('0' + start.day).slice(-2);
    let dateEndFormat = end.year + '-' + ('0' + end.month).slice(-2) + '-' + ('0' + end.day).slice(-2);
    let dateStartFormatReverse = ('0' + start.day).slice(-2) + '-' + ('0' + start.month).slice(-2) + '-' + start.year;
    let dateEndFormatReverse = ('0' + end.day).slice(-2) + '-' + ('0' + end.month).slice(-2) + '-' + end.year;
    let dateStart = new Date(dateStartFormat);
    let dateEnd = new Date(dateEndFormat);

    this.cnf.getAttoken().subscribe((res: any) => {
      if (res.status == 100) {
        this.attoken = this.cnf.generateAttoken(this.projectName, res.datas);
      }
      this.loadDataByDate(dateStartFormatReverse, dateEndFormatReverse).subscribe((res: any) => {
        let decryptData = JSON.parse(this.cnf.decryptData(res.datas));

        this.loadingData = true;
        let result = decryptData[0].fund_daily_nav;
        this.dateStart = dateStart;
        this.dateEnd = dateEnd;
        this.loadMergeSearch(dateStartFormat, dateEndFormat, result);
      });
    });

  }

  loadFundName() {
    let params = new HttpParams();
    params = params.append('appid', 'test'); params = params.append('appkey', 'on');
    params = params.append('apptype', 'desktop');
    params = params.append('token', this.cnf.token);
    params = params.append('lang', this.cnf.lang);
    params = params.append('attoken', this.attoken);

    return this.http.get(this.cnf.URLWSNonPublicArea + '/fund/fund-name/', { params })
      .map((response: Response) => response);
  }

  loadH1() {
    let params = new HttpParams();
    params = params.append('appid', 'test'); params = params.append('appkey', 'on');
    params = params.append('apptype', 'desktop');
    params = params.append('token', this.cnf.token);
    params = params.append('lang', this.cnf.lang);
    params = params.append('attoken', this.attoken);

    return this.http.get(this.cnf.URLWSNonPublicArea + '/fund/daily-nav/h-1/', { params })
      .map((response: Response) => response);
  }

  loadH2() {
    let params = new HttpParams();
    params = params.append('appid', 'test'); params = params.append('appkey', 'on');
    params = params.append('apptype', 'desktop');
    params = params.append('token', this.cnf.token);
    params = params.append('lang', this.cnf.lang);
    params = params.append('attoken', this.attoken);

    return this.http.get(this.cnf.URLWSNonPublicArea + '/fund/daily-nav/h-2/', { params })
      .map((response: Response) => response);
  }

  loadDataByDate(startDate, endDate) {
    let params = new HttpParams();
    params = params.append('appid', 'test'); params = params.append('appkey', 'on');
    params = params.append('apptype', 'desktop');
    params = params.append('token', this.cnf.token);
    params = params.append('lang', this.cnf.lang);
    params = params.append('attoken', this.attoken);

    return this.http.get(this.cnf.URLWSNonPublicArea + '/fund/daily-nav/' + startDate + '/' + endDate, { params })
      .map((response: Response) => response);
  }

  backClicked() {
    this._location.back();
  }

  setOrder(value: string) {
    if (this.order === value) {
      this.reverse = !this.reverse;
    }

    this.order = value;
  }

  valuedate = new Date();

  doResetFilter() {
    this.modelFundName = '';
    this.modelStart = this.disableModelStart;
    this.modelEnd = this.disableModelEnd;

    this.doSearch();
  }
}
