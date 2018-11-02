import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-detail-product',
	templateUrl: './detail-product.component.html',
	styleUrls: ['./detail-product.component.scss']
})
export class DetailProductComponent implements OnInit {

	detailProductData : any = {};

	constructor() { }

	ngOnInit() {
		this.loadData();
	}

	loadData(){
		this.detailProductData = {
			title: "Asuransi Jiwa",
			sub_product: [
				{
					title: "Asuransi Family Saver",
					summary: "Fokus Perlindungan",
					description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et, quis. Perspiciatis repellat perferendis accusamus, ea natus id omnis, ratione alias quo dolore tempore dicta cum aliquid corrupti enim deserunt voluptas. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
				},
				{
					title: "Asuransi Flexi Link",
					summary: "Fokus Perlindungan",
					description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et, quis. Perspiciatis repellat perferendis accusamus, ea natus id omnis, ratione alias quo dolore tempore dicta cum aliquid corrupti enim deserunt voluptas.Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
				},
				{
					title: "Asuransi Flexi Link Amanah Syariah",
					summary: "Fokus Perlindungan",
					description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et, quis. Perspiciatis repellat perferendis accusamus, ea natus id omnis, ratione alias quo dolore tempore dicta cum aliquid corrupti enim deserunt voluptas.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
				},
				{
					title: "Asuransi Invest Link",
					summary: "Fokus Perlindungan",
					description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting.",
				},
			]
		}

	}

}
