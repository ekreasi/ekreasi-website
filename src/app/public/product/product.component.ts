import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-product',
	templateUrl: './product.component.html',
	styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

	productData : any = {};

	constructor() { }

	ngOnInit() {
		this.loadData();
	}

	loadData(){
		this.productData = {

			"title": "Product",
			"summary": "Jenis asuransi yang tepat dapat melindungi dan membantu Anda mengejar tujuan hidup Anda dengan penuh percaya diri. Itulah yang menjadi tujuan kami menciptakan berbagai solusi komprehensif, yang dapat disesuaikan dengan kebutuhan Anda.",
			"products": [
				{
					id: 1,
					title: "Asuransi Kesehatan Perorangan",
					icon: "ekreasi-product1.svg",
					color: "magenta"
				},
				{
					id: 2,
					title: "Asuransi Kesehatan",
					icon: "ekreasi-product2.svg",
					color: "green"
				},
				{
					id: 3,
					title: "Asuransi Jiwa",
					icon: "ekreasi-product3.svg",
					color: "violet"
				},
				{
					id: 4,
					title: "Asuransi Syariah",
					icon: "ekreasi-product4.svg",
					color: "green"
				},
				{
					id: 5,
					title: "Asuransi Kredit",
					icon: "ekreasi-product5.svg",
					color: "violet"
				},
				{
					id: 6,
					title: "Asuransi Perjalanan",
					icon: "ekreasi-product6.svg",
					color: "magenta"
				},
			]
		}
		
	}

}
