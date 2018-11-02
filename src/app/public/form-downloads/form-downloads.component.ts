import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-form-downloads',
	templateUrl: './form-downloads.component.html',
	styleUrls: ['./form-downloads.component.scss']
})
export class FormDownloadsComponent implements OnInit {

	formDownloadData : any = {}

	constructor() { }

	ngOnInit() {
		this.loadData();
	}

	loadData(){
		this.formDownloadData = {
	    	"title": "Form Downloads",
	      	"summary": "Beragam penghargaan berhasil diraih oleh PT ekreasi Life Insurance Indonesia (ekreasi Life) sejak awal unit operasionalnya diluncurkan di Indonesia.",
	      	"downloads": [
	        	{
		          	"title": "Claim Forms",
		          	"data": [
		            	{
		              		"id": "1",
		              		"title": "Indonesia Prestige Brand Award - Warta Ekonomi",
				      		"description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
				      		"url": "http://www.itsmefurzy.com/"
	            		},
			            {
			              "id": "2",
			              "title": "Excellent Service Experience Award 2017",
					      "description" : "Lorem Ipsum",
					      "url": "http://www.itsmefurzy.com/"
			            },
			            {
			              "id": "3",
			              "title": "The 2017 Indonesia WOW Brand Award",
					      "description" : "Lorem Ipsum",
					      "url": "http://www.itsmefurzy.com/"
			            },
			            {
			              "id": "4",
			              "title": "Indonesia Prestige Brand Award - Warta Ekonomi",
					      "description" : "Lorem Ipsum",
					      "url": "http://www.itsmefurzy.com/"
			            },
			            {
			              "id": "5",
			              "title": "Excellent Service Experience Award 2017",
					      "description" : "Lorem Ipsum",
					      "url": "http://www.itsmefurzy.com/"
			            },
			            {
			              "id": "6",
			              "title": "The 2017 Indonesia WOW Brand Award",
					      "description" : "Lorem Ipsum",
					      "url": "http://www.itsmefurzy.com/"
			            },
          			]
        		},
		        {
					"title": "Customer Care Forms",
					"data": [
						{
							"id": "1",
							"title": "Indonesia Prestige Brand Award - Warta Ekonomi",
							"description" : "Lorem Ipsum",
							"url": "http://www.itsmefurzy.com/"
						},
						{
							"id": "2",
							"title": "Excellent Service Experience Award 2017",
							"description" : "Lorem Ipsum",
							"url": "http://www.itsmefurzy.com/"
						},
						{
							"id": "3",
							"title": "The 2017 Indonesia WOW Brand Award",
							"description" : "Lorem Ipsum",
							"url": "http://www.itsmefurzy.com/"
						},
						{
							"id": "4",
							"title": "Indonesia Prestige Brand Award - Warta Ekonomi",
							"description" : "Lorem Ipsum",
							"url": "http://www.itsmefurzy.com/"
						},
						{
							"id": "5",
							"title": "Excellent Service Experience Award 2017",
							"description" : "Lorem Ipsum",
							"url": "http://www.itsmefurzy.com/"
						},
						{
							"id": "6",
							"title": "The 2017 Indonesia WOW Brand Award",
							"description" : "Lorem Ipsum",
							"url": "http://www.itsmefurzy.com/"
						},
					]
		        }
      		]
    	};

	}

}