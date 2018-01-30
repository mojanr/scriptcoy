import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BahanService } from '../bahan.service';
import { HargaBahanService } from '../harga-bahan.service';
import { MessageService } from '../message.service';
declare var $:any;

@Component({
  selector: 'app-harga-bahan-ubah',
  templateUrl: './harga-bahan-ubah.component.html',
  styleUrls: ['./harga-bahan-ubah.component.css']
})
export class HargaBahanUbahComponent implements OnInit {

	// attribute
	public data; // data bahan
	public iterasi = ['x'];

  constructor(private bahan: BahanService, private hargaBahan: HargaBahanService, private activeRoute: ActivatedRoute, private notif: MessageService) { }

  ngOnInit() {
  	// init form
    $("#form-ubah-data-harga-bahan").form({
      on: "blur",
      fields: {
        idHargaBahan: {
          identifier: 'idHargaBahan',
          rules: [
            {
              type: 'empty',
              prompt: 'Field id harga bahan tidak boleh kosong!'
            }
          ]
        },
        bagianGitar: {
          identifier: 'bagianGitar',
          rules: [
            {
              type: 'empty',
              prompt: 'Field bagian gitar tidak boleh kosong!'
            }
          ]
        },
        idBahan: {
          identifier: 'idBahan',
          rules: [
            {
              type: 'empty',
              prompt: 'Field bahan tidak boleh kosong!'
            }
          ]
        },
        hargaBahan: {
          identifier: 'hargaBahan',
          rules: [
            {
              type: 'empty',
              prompt: 'Field harga bahan tidak boleh kosong!'
            },
            {
              type   : 'integer[0..9999999]',
              prompt : 'Field harga bahan tidak boleh kurang dari 0'
            }
          ]
        }
      }
    });

    // init submit click
    $("#simpan-ubah-data-harga-bahan").on("click", function() {
      $("#button-simpan").trigger('click');
    });

    // init dropdown
    $('#bagian-gitar').dropdown();
    $('#bahan').dropdown();

    // load berdasarkan id
  	// get id dari url
  	this.activeRoute.params.subscribe((params) => {
  		console.log('id', params['id']);
  		// load data berdasarkan id
  		this.loadDataBahan(() => {
        this.load(params['id']);
      });
  	});
  }

  // load data berdasarkan id
  private load(idHargaBahan) {
    // load data
    this.hargaBahan.loadDataById(idHargaBahan).subscribe((res) => {
     	console.log(res);
      // cek status response
      if (res['status']) {
      	// set data to form
	      $('#form-ubah-data-harga-bahan').form('set values', {
	        idHargaBahan: res['message'][0]['idHargaBahan'],
	        bagianGitar: res['message'][0]['bagianGitar'],
	        idBahan: res['message'][0]['idBahan'],
	        hargaBahan: res['message'][0]['hargaBahan'],
	      });
      } else {
      	// error
      }
    });
  }

  // load data bahan
  private loadDataBahan(callback) {
    // load data
    this.bahan.loadData().subscribe((res) => {
    	console.log(res);
      // cek status response
      if (res['status']) {
      	// set id
      	this.data = res['message'];
      	callback();
      } else {
      	// error
      }
    });
  }

  // simpan
  public simpan() {
    console.log('simpan');
    // cek validasi form
    if ($("#form-ubah-data-harga-bahan").form('is valid')) {
      // form valid
      // add class loading
  		$('#simpan-ubah-data-harga-bahan').addClass('loading');
      // get value form
      var value = $('#form-ubah-data-harga-bahan').form('get values');
      console.log(value);
      // send
      this.hargaBahan.ubahData(value).subscribe((res) => {
        if (res['status']) {
  				console.log(res['message']);
          // notif
          this.notif.notif(true, res['status'], res['message']);
  				// remove class loading
	        $('#simpan-ubah-data-harga-bahan').removeClass('loading');
  			} else {
  				// error
          console.log(res['message']);
          // notif
          this.notif.notif(true, res['status'], res['message']);
          // remove class loading
          $('#simpan-ubah-data-harga-bahan').removeClass('loading');
  			}
      });
    } else {
      // console.log('field tidak boleh kosong');
      // // notif
      // this.notif.notif(true, false, 'Field tidak boleh kosong!');
      setTimeout(() => {
        var message = $('#hidden-message').html();
        this.notif.notif(true, false, message);
      }, 50);
    }
  }
}
