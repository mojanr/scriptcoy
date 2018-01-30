import { Component, OnInit } from '@angular/core';
import { PesananService } from '../pesanan.service';
import { MessageService } from '../message.service';
import { AuthService } from '../auth.service';
declare var $:any;

@Component({
  selector: 'app-pesanan',
  templateUrl: './pesanan.component.html',
  styleUrls: ['./pesanan.component.css']
})
export class PesananComponent implements OnInit {

	// attribute
	public data = [];
	public index;
  private debounce;
  public dataCari;
  public dataUbahStatus;
  // public dataIsEmpty = true;

  constructor(private pesanan: PesananService, private notif: MessageService, private auth: AuthService) { }

  ngOnInit() {
    // init modal
    $("#hapus-data").modal({detachable: false});
    // init modal
    $("#ubah-status-data").modal({detachable: false});
    //
    $('#dropdown-status').dropdown();

  	// load data 
  	this.load();
  }

  // load data
  private load() {
  	this.pesanan.loadData().subscribe((res) => {
  		console.log(res);
      // cek status response
      if (res['status']) {
      	this.data = res['message'];
        // if (this.data.length == 0) {
        //   // this.dataIsEmpty = false;
        // }
      } else {
      	// error
      }
      $('#cari-data').removeClass('loading');
  	});
  }

  // ubah status
  public modalUbahStatus(item) {
  	// set index berdasarkan item
 		this.index = this.data.map(function(elemen){return elemen.idPesanan}).indexOf(item.idPesanan);
  	// set datta ubah status
    this.dataUbahStatus = item;
    // show modal ubah status
    $('#ubah-status-data').modal('show');
  }

  public ubahStatus() {
    // add class loading
    $('#button-ubah').addClass('loading');
    var status = $('#dropdown-status').dropdown('get value');
    // ubah status
    this.pesanan.ubahStatus(this.dataUbahStatus.idPesanan, {username: this.auth.getPengelola().username, status:status}).subscribe((res) => {
      console.log(res);
      // cek status response
      if (res['status']) {
        // notif
        this.notif.notif(true, res['status'], res['message']);
        // remove class loading
        $('#button-ubah').removeClass('loading');
        // load
        this.load();
      } else {
        // error
        // notif
        this.notif.notif(true, res['status'], res['message']);
        // remove class loading
        $('#button-ubah').removeClass('loading');
      }
      $('#ubah-status-data').modal('hide');
    });
  }

  // cari data
  public cariData(value) {
    if (value) {
      clearTimeout(this.debounce);
      this.debounce = setTimeout(() => {
        $('#cari-data').addClass('loading');
        console.log(value);
        this.pesanan.cariData(value).subscribe((res) => {
          console.log(res);
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
