import { Component, OnInit } from '@angular/core';
import { MouseEvent } from '@agm/core';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
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