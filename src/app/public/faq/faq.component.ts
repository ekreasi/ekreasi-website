import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-faq',
	templateUrl: './faq.component.html',
	styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit {

	faqData : any = {};

	constructor() { }

	ngOnInit() {
		this.loadData();
	}

	loadData(){
		this.faqData = {
			"title": "Frequently Asked Questions (FAQ)",
			"summary": "Beragam penghargaan berhasil diraih oleh PT ekreasi Life Insurance Indonesia (ekreasi Life) sejak awal unit operasionalnya diluncurkan di Indonesia.",
			"faqs": [
				{
				  	"title": "Pertanyaan Umum",
				  	"data": [
					    {
							"id": "1",
							"title": "Apa yang harus saya lakukan jika polis hilang?",
							"description" : "Bila Polis Anda hilang atau rusak, kami dapat mencetakkan kembali sebuah Polis duplikat untuk Anda dengan dikenakan biaya cetak ulang. Lengkapi dokumen berikut sebagai persyaratan cetak ulang Polis: Surat permohonan cetak ulang Polis yang diajukan oleh Pemegang Polis sendiri. Surat pernyataan kehilangan dari Kepolisian. Fotokopi identitas yang masih berlaku. Bukti pembayaran biaya cetak ulang Polis.",
					    },
					    {
							"id": "2",
							"title": "Apa yang harus saya lakukan jika polis hilang?",
							"description" : "Bila Polis Anda hilang atau rusak, kami dapat mencetakkan kembali sebuah Polis duplikat untuk Anda dengan dikenakan biaya cetak ulang. Lengkapi dokumen berikut sebagai persyaratan cetak ulang Polis: Surat permohonan cetak ulang Polis yang diajukan oleh Pemegang Polis sendiri. Surat pernyataan kehilangan dari Kepolisian. Fotokopi identitas yang masih berlaku. Bukti pembayaran biaya cetak ulang Polis.",
					    },
					    {
							"id": "3",
							"title": "Apa yang harus saya lakukan jika polis hilang?",
							"description" : "Bila Polis Anda hilang atau rusak, kami dapat mencetakkan kembali sebuah Polis duplikat untuk Anda dengan dikenakan biaya cetak ulang. Lengkapi dokumen berikut sebagai persyaratan cetak ulang Polis: Surat permohonan cetak ulang Polis yang diajukan oleh Pemegang Polis sendiri. Surat pernyataan kehilangan dari Kepolisian. Fotokopi identitas yang masih berlaku. Bukti pembayaran biaya cetak ulang Polis.",
					    },
					    {
							"id": "4",
							"title": "Apa yang harus saya lakukan jika polis hilang?",
							"description" : "Bila Polis Anda hilang atau rusak, kami dapat mencetakkan kembali sebuah Polis duplikat untuk Anda dengan dikenakan biaya cetak ulang. Lengkapi dokumen berikut sebagai persyaratan cetak ulang Polis: Surat permohonan cetak ulang Polis yang diajukan oleh Pemegang Polis sendiri. Surat pernyataan kehilangan dari Kepolisian. Fotokopi identitas yang masih berlaku. Bukti pembayaran biaya cetak ulang Polis.",
					    },
					    {
							"id": "5",
							"title": "Apa yang harus saya lakukan jika polis hilang?",
							"description" : "Bila Polis Anda hilang atau rusak, kami dapat mencetakkan kembali sebuah Polis duplikat untuk Anda dengan dikenakan biaya cetak ulang. Lengkapi dokumen berikut sebagai persyaratan cetak ulang Polis: Surat permohonan cetak ulang Polis yang diajukan oleh Pemegang Polis sendiri. Surat pernyataan kehilangan dari Kepolisian. Fotokopi identitas yang masih berlaku. Bukti pembayaran biaya cetak ulang Polis.",
					    },
					    {
							"id": "6",
							"title": "Apa yang harus saya lakukan jika polis hilang?",
							"description" : "Bila Polis Anda hilang atau rusak, kami dapat mencetakkan kembali sebuah Polis duplikat untuk Anda dengan dikenakan biaya cetak ulang. Lengkapi dokumen berikut sebagai persyaratan cetak ulang Polis: Surat permohonan cetak ulang Polis yang diajukan oleh Pemegang Polis sendiri. Surat pernyataan kehilangan dari Kepolisian. Fotokopi identitas yang masih berlaku. Bukti pembayaran biaya cetak ulang Polis.",
					    },
				  	]
				},{
				  	"title": "Polis",
				  	"data": [
					    {
							"id": "1",
							"title": "Apa yang harus saya lakukan jika polis hilang?",
							"description" : "Bila Polis Anda hilang atau rusak, kami dapat mencetakkan kembali sebuah Polis duplikat untuk Anda dengan dikenakan biaya cetak ulang. Lengkapi dokumen berikut sebagai persyaratan cetak ulang Polis: Surat permohonan cetak ulang Polis yang diajukan oleh Pemegang Polis sendiri. Surat pernyataan kehilangan dari Kepolisian. Fotokopi identitas yang masih berlaku. Bukti pembayaran biaya cetak ulang Polis.",
					    },
					    {
							"id": "2",
							"title": "Apa yang harus saya lakukan jika polis hilang?",
							"description" : "Bila Polis Anda hilang atau rusak, kami dapat mencetakkan kembali sebuah Polis duplikat untuk Anda dengan dikenakan biaya cetak ulang. Lengkapi dokumen berikut sebagai persyaratan cetak ulang Polis: Surat permohonan cetak ulang Polis yang diajukan oleh Pemegang Polis sendiri. Surat pernyataan kehilangan dari Kepolisian. Fotokopi identitas yang masih berlaku. Bukti pembayaran biaya cetak ulang Polis.",
					    },
					    {
							"id": "3",
							"title": "Apa yang harus saya lakukan jika polis hilang?",
							"description" : "Bila Polis Anda hilang atau rusak, kami dapat mencetakkan kembali sebuah Polis duplikat untuk Anda dengan dikenakan biaya cetak ulang. Lengkapi dokumen berikut sebagai persyaratan cetak ulang Polis: Surat permohonan cetak ulang Polis yang diajukan oleh Pemegang Polis sendiri. Surat pernyataan kehilangan dari Kepolisian. Fotokopi identitas yang masih berlaku. Bukti pembayaran biaya cetak ulang Polis.",
					    },
				  	]
				}
			]
		};

	}

}
