import { Component, OnInit } from '@angular/core';
import { BahanService } from '../bahan.service';
import { HargaBahanService } from '../harga-bahan.service';
import { MessageService } from '../message.service';
declare var $:any;

@Component({
  selector: 'app-harga-bahan-tambah',
  templateUrl: './harga-bahan-tambah.component.html',
  styleUrls: ['./harga-bahan-tambah.component.css']
})
export class HargaBahanTambahComponent implements OnInit {

	// attribute
	public data; // data bahan

  constructor(private bahan: BahanService, private hargaBahan: HargaBahanService, private notif: MessageService) { }

  ngOnInit() {
  	// init form
  	$("#form-tambah-data-harga-bahan").form({
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
		$("#simpan-tambah-data-harga-bahan").on("click", function() {
			$("#button-simpan").trigger('click');
		});

		// init dropdown
    $('#bagian-gitar').dropdown();
    $('#bahan').dropdown();

    // load new id
    this.loadNewId();
  	// load data bahan
  	this.loadDataBahan();
  }

  // ngViewOnInit() {
  // 	setTimeout(() => {
  // 		$('#bahan').dropdown();
  // 	}, 1000);
  // }

  // load new id
  private loadNewId() {
  	this.hargaBahan.getNewId().subscribe((res) => {
  		console.log(res);
      // cek status response
      if (res['status']) {
      	// set id
      	$('#form-tambah-data-harga-bahan').form('set values', {
	  			idHargaBahan: res['message'][0]['idHargaBahan']
	  		});
      } else {
      	// error
      }
    });
  }

  // load data bahan
  private loadDataBahan() {
  	// load data
    this.bahan.loadData().subscribe((res) => {
    	console.log(res);
      // cek status response
      if (res['status']) {
      	// set id
      	this.data = res['message'];
      } else {
      	// error
      }
    });
  }

  // simpan
  public simpan() {
  	console.log('simpan');
  	// cek validasi form
  	if ($("#form-tambah-data-harga-bahan").form('is valid')) {
  		// form valid
  		// add class loading
  		$('#simpan-tambah-data-harga-bahan').addClass('loading');
  		// get value form
  		var value = $('#form-tambah-data-harga-bahan').form('get values');
  		console.log(value);
  		// send
  		this.hargaBahan.tambahData(value).subscribe((res) => {
  			if (res['status']) {
  				console.log(res['message']);
          // notif
          this.notif.notif(true, res['status'], res['message']);
  				// remove class loading
	        $('#simpan-tambah-data-harga-bahan').removeClass('loading');
  				// clear form
  				$("#form-tambah-data-harga-bahan").form('clear');
  				// load new id
       		this.loadNewId();
  			} else {
  				// error
          console.log(res['message']);
          // notif
          this.notif.notif(true, res['status'], res['message']);
          // remove class loading
          $('#simpan-tambah-data-harga-bahan').removeClass('loading');
  			}
  		});
  	} else {
  		// console.log('field tidak boleh kosong');
    //   // notif
    //   this.notif.notif(true, false, 'Field tidak boleh kosong!');
      setTimeout(() => {
        var message = $('#hidden-message').html();
        this.notif.notif(true, false, message);
      }, 50);
  	}
  }

}
