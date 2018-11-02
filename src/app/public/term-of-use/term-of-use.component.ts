import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Config } from '../../config';

@Component({
  selector: 'app-term-of-use',
  templateUrl: './term-of-use.component.html',
  styleUrls: ['./term-of-use.component.scss'],
	providers: [ Config ]
})
export class TermOfUseComponent implements OnInit {
  public data : any = {};

  constructor( private cnf: Config, private http:HttpClient ) {

  }

  ngOnInit() {
    // this.data = {
    //   "title": "About ekreasi Life",
    //   "summary": "Sebagai perusahaan underwriting, kami menilai, memperhitungkan dan mengelola risiko dengan kedisplinan dan pengetahuan yang mendalam. Kami melayani dan membayar klaim secara adil. Perusahaan ini juga dikenal karena penawaran produk dan layanannya yang luas, kemampuan distribusi yang luas, kekuatan keuangan yang andal serta jaringan perusahaan yang terdapat di seluruh dunia.",
    //   "image": "./assets/img/ekreasi-img-about.jpg",
    //   "description": "ekreasi merupakan pemimpin global dalam penyediaan asuransi properti dan tanggung gugat yang diperdagangkan secara publik. Beroperasi di 54 negara, ekreasi menyediakan asuransi properti dan tanggung gugat komersial serta individu, asuransi kecelakaan diri dan asuransi kesehatan tambahan, reasuransi dan asuransi jiwa bagi beragam kelompok nasabah. Perusahaan ini juga dikenal karena penawaran produk dan layanannya yang luas, kemampuan distribusi yang luas, kekuatan keuangan yang luar biasa serta perusahaan lokal yang terdapat di seluruh dunia. Perusahaan induknya, ekreasi Limited, terdaftar di Bursa Efek New York (NYSE: CB) dan merupakan komponen indeks S&P 500. ekreasi memiliki kantor eksekutif di Zurich, New York, London, dan lokasi-lokasi lainnya, serta mempekerjakan sekitar 31,000 orang di seluruh dunia. Lisensi ekreasi di Asia Pasifik terdiri dari jaringan operasi yang luas, melayani Australia, Hong Kong, Indonesia, Korea, Makau, Malaysia, Selandia Baru, Filipina, Singapura, Taiwan, Thailand dan Vietnam.",
    // };

    this.http.get( this.cnf.URLWS + '/term_of_use/frontend/all?appid=3K123451&appkey=3K123451&lang=' + this.cnf.lang )
		.subscribe(
      (res:any) => {
        if(res.status == 100){
          this.data = res.datas;
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

}
