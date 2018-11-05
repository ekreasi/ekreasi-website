import { environment } from './../environments/environment';
import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { HttpClient, HttpParams } from '../../node_modules/@angular/common/http';

@Injectable()
export class Config {

  constructor(private http: HttpClient) {

  }

  URLWS: string = environment.apiEndpoint;
  URLWSNonPublicArea: string = environment.apiEndpoint;
  lang: string = (localStorage.getItem('lang') && localStorage.getItem('lang') != 'null' ? localStorage.getItem('lang') : 'id');
  token: string = (localStorage.getItem('token') ? localStorage.getItem('token') : '');
  userId: string = (localStorage.getItem('userid') ? localStorage.getItem('userid') : '');
  appid: string = '3K123451';
  appkey: string = '3K123451';
  apptype: string = 'web';
  googleRecaptchaKey: string = environment.googleRecaptchaKey;

  encryptKey: string = '6Eh2LM7g6yUeTGgD';

  prefixTitle: string = 'eKreasi ';
  postfixTitle: string = '';

  decryptData(encryptData) {
    let decodeString = atob(encryptData);

    let key = CryptoJS.enc.Utf8.parse(this.encryptKey);
    let decrypted = CryptoJS.AES.decrypt(decodeString, key,
      {
        keySize: 128 / 8,
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
      }).toString(CryptoJS.enc.Utf8);

    return decrypted;
  }

  encryptData(decryptData) {
    let key = CryptoJS.enc.Utf8.parse(this.encryptKey);
    let encrypted = CryptoJS.AES.encrypt(decryptData, key,
      {
        keySize: 128 / 8,
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
      }).toString();
    let encryptData = btoa(encrypted);

    return encryptData;
  }

  md5(plainText) {
    let output = CryptoJS.MD5(plainText).toString();

    return output;
  }

  htmlEntities(str) {
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  strip_tags(_html, args) {
    var _tags = [], _tag = "";
    for (var _a = 1; _a < args.length; _a++) {
      _tag = args[_a].replace(/<|>/g, '').trim();
      if (args[_a].length > 0) _tags.push(_tag, "/" + _tag);
    }

    if (!(typeof _html == "string") && !(_html instanceof String)) return "";
    else if (_tags.length == 0) return _html.replace(/<(\s*\/?)[^>]+>/g, "");
    else {
      var _re = new RegExp("<(?!(" + _tags.join("|") + ")\s*\/?)[^>]+>", "g");
      return _html.replace(_re, '');
    }
  }

  getAttoken() {
    let params = new HttpParams();
    params = params.append('appid', this.appid);
    params = params.append('appkey', this.appkey);
    params = params.append('apptype', this.apptype);

    return this.http.get(this.URLWSNonPublicArea + '/user_frontend/getATToken', { params })
      .map((response: Response) => response);
  }

  generateAttoken(projectName, datas) {
    let decrypt = this.decryptData(datas);
    let attoken = this.encryptData(projectName + '|' + decrypt);

    return attoken;
  }
}