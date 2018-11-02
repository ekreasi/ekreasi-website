import { Component, OnInit } from '@angular/core';
import { UserInternal } from './../../validation';
import { NgxCarousel } from 'ngx-carousel';
import { CommonModule } from '@angular/common';
import { HttpClient } from "@angular/common/http";
import { Config } from '../../config';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
	providers: [ Config ]
})

export class HomeComponent implements OnInit {

  public userInternal:UserInternal;
  public carouselOne: NgxCarousel;
  public dataCarousel: object[] = [];

  constructor( private cnf: Config, private http:HttpClient ) {
  }

  ngOnInit() {
    this.userInternal = new UserInternal({email:"", password:""})
    // Carousel 
    this.carouselOne = {
      grid: {xs: 1, sm: 1, md: 1, lg: 1, all: 0},
      slide: 1,
      speed: 400,
      interval: 4000,
      point: {
        visible: true
      },
      load: 2,
      touch: true,
      loop: true,
      custom: 'banner'
    }
    // this.dataCarousel = [
    //   {
    //     'id': 1,
    //     'image': './assets/img/img-hero1.jpg',
    //     'title': 'Asuransi, Salah Satu Cara Mewujudkan Cinta kepada Keluarga',
    //     'description': 'Terdiagnosa penyakit kritis adalah risiko kesehatan yang bisa datang kapan dan kepada siapa saja. Faktor usia dan gaya hidup masih jadi penyebab utama…',
    //     'url': 'http://www.agenwebsite.com/'
    //   },
    //   {
    //     'id': 2,
    //     'image': './assets/img/img-hero2.jpg',
    //     'title': 'Solusi untuk Mewujudkan Cinta kepada Keluarga',
    //     'description': 'Terdiagnosa penyakit kritis adalah risiko kesehatan yang bisa datang kapan dan kepada siapa saja. Faktor usia dan gaya hidup masih jadi penyebab utama…',
    //     'url': 'http://www.agenwebsite.com/'
    //   },
    //   {
    //     'id': 3,
    //     'image': './assets/img/img-hero3.jpg',
    //     'title': 'Asuransi, Salah Satu Cara Mewujudkan Cinta kepada Keluarga',
    //     'description': 'Terdiagnosa penyakit kritis adalah risiko kesehatan yang bisa datang kapan dan kepada siapa saja. Faktor usia dan gaya hidup masih jadi penyebab utama…',
    //     'url': 'http://www.agenwebsite.com/'
    //   },
    // ];
    this.http.get( this.cnf.URLWS + '/banner/frontend/all?appid=test&apptype=web&lang=' + this.cnf.lang)
		.subscribe(
      (res:any) => {
        if(res.status == 100){
          this.dataCarousel = res.datas;
        }
      },
      response => {
        console.log("GET call in error", response);
      },
      () => {
        console.log("The GET observable is now completed.");
      }
    );
  }

  onInternalSubmit({ value, valid}: { value: UserInternal, valid: boolean }) {
    this.userInternal = value;
  }
  
  public myfunc(evt: any) {

  }

}
