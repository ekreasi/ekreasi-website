import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-awards',
  templateUrl: './awards.component.html',
  styleUrls: ['./awards.component.scss']
})
export class AwardsComponent implements OnInit {
  public dataAwards : any = {};

  constructor() { }

  ngOnInit() {
    this.dataAwards = {
      "title": "Awards",
      "summary": "Beragam penghargaan berhasil diraih oleh PT ekreasi Life Insurance Indonesia (ekreasi Life) sejak awal unit operasionalnya diluncurkan di Indonesia.",
      "awards": [
        {
          "title": "2014",
          "data": [
            {
              "id": "1",
              "title": "Indonesia Prestige Brand Award - Warta Ekonomi"
            },
            {
              "id": "2",
              "title": "Excellent Service Experience Award 2017"
            },
            {
              "id": "3",
              "title": "The 2017 Indonesia WOW Brand Award"
            },
            {
              "id": "4",
              "title": "Indonesia Prestige Brand Award - Warta Ekonomi"
            },
            {
              "id": "5",
              "title": "Excellent Service Experience Award 2017"
            },
            {
              "id": "6",
              "title": "The 2017 Indonesia WOW Brand Award"
            },
          ]
        },
        {
          "title": "2015",
          "data": [
            {
              "id": "1",
              "title": "Indonesia Prestige Brand Award - Warta Ekonomi"
            },
            {
              "id": "2",
              "title": "Excellent Service Experience Award 2017"
            },
            {
              "id": "3",
              "title": "The 2017 Indonesia WOW Brand Award"
            },
            {
              "id": "4",
              "title": "Indonesia Prestige Brand Award - Warta Ekonomi"
            },
            {
              "id": "5",
              "title": "Excellent Service Experience Award 2017"
            },
            {
              "id": "6",
              "title": "The 2017 Indonesia WOW Brand Award"
            },
          ]
        },
        {
          "title": "2016",
          "data": [
            {
              "id": "1",
              "title": "Indonesia Prestige Brand Award - Warta Ekonomi"
            },
            {
              "id": "2",
              "title": "Excellent Service Experience Award 2017"
            },
            {
              "id": "3",
              "title": "The 2017 Indonesia WOW Brand Award"
            },
            {
              "id": "4",
              "title": "Indonesia Prestige Brand Award - Warta Ekonomi"
            },
            {
              "id": "5",
              "title": "Excellent Service Experience Award 2017"
            },
            {
              "id": "6",
              "title": "The 2017 Indonesia WOW Brand Award"
            },
          ]
        },
        {
          "title": "2017",
          "data": [
            {
              "id": "1",
              "title": "Indonesia Prestige Brand Award - Warta Ekonomi"
            },
            {
              "id": "2",
              "title": "Excellent Service Experience Award 2017"
            },
            {
              "id": "3",
              "title": "The 2017 Indonesia WOW Brand Award"
            },
            {
              "id": "4",
              "title": "Indonesia Prestige Brand Award - Warta Ekonomi"
            },
            {
              "id": "5",
              "title": "Excellent Service Experience Award 2017"
            },
            {
              "id": "6",
              "title": "The 2017 Indonesia WOW Brand Award"
            },
          ]
        }
      ]
    };
  }

}
