import { Component, OnInit } from '@angular/core';
import { HargaBahanService } from '../harga-bahan.service';
import { MessageService } from '../message.service';
declare var $:any;

@Component({
  selector: 'app-harga-bahan',
  templateUrl: './harga-bahan.component.html',
  styleUrls: ['./harga-bahan.component.css']
})
export class HargaBahanComponent implements OnInit {

	// attribute
	public data = [];
	public dataHapus;
  public dataCari;
	public index;
  private debounce;

  constructor(private hargaBahan: HargaBahanService, private notif: MessageService) { }

  ngOnInit() {
    // init modal
    $("#hapus-data").modal({detachable: false});
    
  	// load data
    this.load();
  }

  // load data
  private load() {
  	// load data
    this.hargaBahan.loadData().subscribe((res) => {
    	console.log(res);
      // cek status response
      if (res['status']) {
      	this.data = res['message'];
      } else {
      	// error
      }
      $('#cari-data').removeClass('loading');
    });
  }

  // modal hapus data
 	public modalHapus(item) {
 		// set index berdasarkan item
 		this.index = this.data.map(function(elemen){return elemen.idHargaBahan}).indexOf(item.idHargaBahan);
 		// set data hapus
 		// set data hapus
 		this.dataHapus = item;
 		// show modal
 		$('#hapus-data').modal('show');
 	}

 	// hapus data
 	public hapusData() {
    // add class loading
    $('#button-hapus').addClass('loading');
 		// request hapus data
 		this.hargaBahan.hapusData(this.dataHapus.idHargaBahan).subscribe((res) => {
 			console.log(res);
 			// cek status response
 			if (res['status']) {
 			  // success
        // notif
        this.notif.notif(true, res['status'], res['message']);
        // remove class loading
        $('#button-hapus').removeClass('loading');
        // remove item dari data
 				this.data.splice(this.index, 1);
        // hide modal
 				$('#hapus-data').modal('hide');
 			} else {
 				// error
        // notif
        this.notif.notif(true, res['status'], res['message']);
        // remove class loading
        $('#button-hapus').removeClass('loading');
 			}
 		});
 	}

  // cari data
  public cariData(value) {
    if (value) {
      clearTimeout(this.debounce);
      this.debounce = setTimeout(() => {
        $('#cari-data').addClass('loading');
        console.log(value);
        this.hargaBahan.cariData(value).subscribe((res) => {
          // cek status response
          if (res['status']) {
            this.data = res['message'];
          } else {
            // error
          }
          $('#cari-data').removeClass('loading');
        });
      }, 1000);
    } else {
      console.log('load');
      this.load();
    }
  }

}
