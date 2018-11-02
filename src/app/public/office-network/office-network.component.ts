import { Component, OnInit } from '@angular/core';
import { MouseEvent } from '@agm/core';

@Component({
  selector: 'app-office-network',
  templateUrl: './office-network.component.html',
  styleUrls: ['./office-network.component.scss']
})
export class OfficeNetworkComponent implements OnInit {
  page = 1;
  constructor() { }

  ngOnInit() {
  }
  zoom: number = 15;
  lat: number =  -6.224783;
  lng: number = 106.810068;
  markers: marker[] = [
    {
      lat: -6.224783,
      lng: 106.810068
    },
  ]
 }
 interface marker {
   lat: number;
   lng: number;
 }