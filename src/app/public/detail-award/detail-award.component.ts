import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { Config } from '../../config';

@Component({
  selector: 'app-detail-award',
  templateUrl: './detail-award.component.html',
  styleUrls: ['./detail-award.component.scss'],
	providers: [ Config ]
})
export class DetailAwardComponent implements OnInit {
  params : any;
  data : any = {};

  constructor( private route: ActivatedRoute, private cnf: Config, private http:HttpClient ) {
    this.route.params.subscribe( params => this.params = params );
  }

  ngOnInit() {
    let res = {"status":100,"message":"Success","datas":{"id":"LTLxUC8lE6vW74pHQr4G","title":"IPO, Jasa Mitra Abadi Asuransi Syariah Pertama yang Melantai di BEI","publishDateStart":null,"publishDateFinish":null,"approvalNo":0,"approvalUserId":null,"rowStatus":null,"rowUserId":null,"rowTimeUpdate":null,"subtitle":null,"summary":"PT Asuransi Jiwa Syariah Jasa Mitra Abadi Tbk mencatatkan sahamnya di Bursa Efek Indonesia ( BEI) dengan skema penawaran umum perdana (initial public offering/IPO). Hal ini merupakan penawaran umum saham asuransi syariah pertama di Indonesia","createDate":null,"createUserId":null,"description":"PT Asuransi Jiwa Syariah Jasa Mitra Abadi Tbk mencatatkan sahamnya di Bursa Efek Indonesia ( BEI) dengan skema penawaran umum perdana (initial public offering/IPO). Hal ini merupakan penawaran umum saham asuransi syariah pertama di Indonesia. Perseroan adalah emiten ke-34 yang melantai di BEI tahun ini dengan kode emiten JMAS. Pencatatan saham perdana dilakukan hari ini, Senin (18/12/2017) di BEI, Jakarta. Dengan demikian, JMAS adalah emiten ke-564 yang melantai di BEI. JMAS mencatatkan sebanyak 1.000.000.000 saham pada penawaran ini. Saham JMAS yang ditawarkan kepada publik mencapai 400.000.000. Baca juga : MNC InsuranceDari IPO, perseroan mengincar dana segar sebesar Rp 56 miliar. Kapitalisasi pasar dipatok sebesar Rp 140 miliar. Harga saham yang ditawarkan adalah Rp 140 per lembar saham. Seluruh dana yang diperoleh dari IPO akan digunakan JMAS untuk modal kerja.Bertindak sebagai penjamin pelaksana emisi adalah PT Jasa Utama Capital Sekuritas. Sementara itu, yang bertindak sebagai administrasi sekuritas adalah PT Sharestar Indonesia. Hingga 30 Juni 2017, total aset JMAS tercatat sebesar Rp 96,33 miliar. Capaian tersebut meningkat dibandingkan pada 30 Desember 2017 yang tercatat sebesar Rp 70,82 miliar.","image0Filename":"https://asset.kompas.com/crop/0x0:1000x667/750x500/data/photo/2017/10/12/20521871506342424d6e-bursa-efek-indonesia-ekonomi.jpg","image1Filename":null,"image2Filename":null,"image3Filename":null,"titleEn":"IPO, Jasa Mitra Abadi Asuransi Syariah Pertama yang Melantai di BEI","subtitleEn":null,"descriptionEn":"PT Asuransi Jiwa Syariah Jasa Mitra Abadi Tbk mencatatkan sahamnya di Bursa Efek Indonesia ( BEI) dengan skema penawaran umum perdana (initial public offering/IPO). Hal ini merupakan penawaran umum saham asuransi syariah pertama di Indonesia. Perseroan adalah emiten ke-34 yang melantai di BEI tahun ini dengan kode emiten JMAS. Pencatatan saham perdana dilakukan hari ini, Senin (18/12/2017) di BEI, Jakarta. Dengan demikian, JMAS adalah emiten ke-564 yang melantai di BEI. JMAS mencatatkan sebanyak 1.000.000.000 saham pada penawaran ini. Saham JMAS yang ditawarkan kepada publik mencapai 400.000.000. Baca juga : MNC InsuranceDari IPO, perseroan mengincar dana segar sebesar Rp 56 miliar. Kapitalisasi pasar dipatok sebesar Rp 140 miliar. Harga saham yang ditawarkan adalah Rp 140 per lembar saham. Seluruh dana yang diperoleh dari IPO akan digunakan JMAS untuk modal kerja.Bertindak sebagai penjamin pelaksana emisi adalah PT Jasa Utama Capital Sekuritas. Sementara itu, yang bertindak sebagai administrasi sekuritas adalah PT Sharestar Indonesia. Hingga 30 Juni 2017, total aset JMAS tercatat sebesar Rp 96,33 miliar. Capaian tersebut meningkat dibandingkan pada 30 Desember 2017 yang tercatat sebesar Rp 70,82 miliar.","summaryEn":"PT Asuransi Jiwa Syariah Jasa Mitra Abadi Tbk mencatatkan sahamnya di Bursa Efek Indonesia ( BEI) dengan skema penawaran umum perdana (initial public offering/IPO). Hal ini merupakan penawaran umum saham asuransi syariah pertama di Indonesia","imageAlt":null,"imageAltEn":null,"metaDescription":null,"metaDescriptionEn":null,"metaKeyword":null,"metaKeywordEn":null},"counter":0};
    this.data = res.datas;
  }
}