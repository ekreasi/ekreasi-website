import { Component, OnInit } from '@angular/core';
import { NgxCarousel } from 'ngx-carousel';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public carouselOne: NgxCarousel;
  constructor() { }

  ngOnInit() {
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


        
  }

  
}
