import { Component, OnInit } from '@angular/core';
import { BahanService } from '../bahan.service';
import { MessageService } from '../message.service';
declare var $:any;

@Component({
  selector: 'app-bahan',
  templateUrl: './bahan.component.html',
  styleUrls: ['./bahan.component.css']
})
export class BahanComponent implements OnInit {

	// attribute
	public data = [];
	public dataHapus;
  public dataCari;
	public index;
  private debounce;
  // public dataIsEmpty;

  constructor(private bahan: BahanService, private notif: MessageService) { }

  ngOnInit() {
    // init modal
    $("#hapus-data").modal({detachable: false});

  	// load data
    this.load();
  }

  // load data
  private load() {
  	// load data
    this.bahan.loadData().subscribe((res) => {
    	console.log(res);
      // cek status response
      if (res['status']) {
      	this.data = res['message'];
        // if (this.data.length == 0) {
        //   this.dataIsEmpty = true;
        // }
      } else {
      	// error
      }
      $('#cari-data').removeClass('loading');
    });
  }

  // modal hapus data
 	public modalHapus(item) {
 		// set index berdasarkan item
 		this.index = this.data.map(function(elemen){return elemen.idBahan}).indexOf(item.idBahan);
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
 		this.bahan.hapusData(this.dataHapus.idBahan).subscribe((res) => {
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
        this.bahan.cariData(value).subscribe((res) => {
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
