import { Injectable } from '@angular/core';

@Injectable()
export class Config {
  // URLWS: string = 'http://localhost/ekreasi';
  // URLWS: string = 'http://itsmefurzy.com/ekreasi';
  // URLWS: string = 'http://35.202.39.239:8080';
  URLWS: string = 'http://35.200.105.66:8080';
  token: string = 'QOQs22TWUQgSKeaUU457';
  lang: string = ( localStorage.getItem('lang') != '' ? localStorage.getItem('lang') : 'id' );

}