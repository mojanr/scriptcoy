import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BahanService } from '../bahan.service';
import { MessageService } from '../message.service';
declare var $:any;

@Component({
  selector: 'app-bahan-ubah',
  templateUrl: './bahan-ubah.component.html',
  styleUrls: ['./bahan-ubah.component.css']
})
export class BahanUbahComponent implements OnInit {

	// attribute
  public data;
  // view child input file
  @ViewChild('fileGambar') fileGambar;

  constructor(private bahan: BahanService, private activeRoute: ActivatedRoute, private notif: MessageService) { }

  ngOnInit() {
  	// init form
    $("#form-ubah-data-bahan").form({
      on: "blur",
      fields: {
        idBahan: {
          identifier: 'idBahan',
          rules: [
            {
              type: 'empty',
              prompt: 'Field id bahan tidak boleh kosong!'
            }
          ]
        },
        namaBahan: {
          identifier: 'namaBahan',
          rules: [
            {
              type: 'empty',
              prompt: 'Field nama bahan tidak boleh kosong!'
            }
          ]
        },
        keteranganBahan: {
          identifier: 'keteranganBahan',
          rules: [
            {
              type: 'empty',
              prompt: 'Field keterangan tidak boleh kosong!'
            }
          ]
        },
        // gambarBahan: "empty"
      }
    });

    // init submit click
    $("#simpan-ubah-data-bahan").on("click", function() {
      $("#button-simpan").trigger('click');
    });

    // load berdasarkan id
  	// get id dari url
  	this.activeRoute.params.subscribe((params) => {
  		console.log('id', params['id']);
      // load data berdasarkan id
      this.load(params['id']);
  	});
  }

  // load data
  private load(idBahan) {
  	// load data
    this.bahan.loadDataById(idBahan).subscribe((res) => {
    	console.log(res);
      // cek status response
      if (res['status']) {
      	// set data
	      this.data = res['message'];
	      //set form
	      $("#form-ubah-data-bahan").form("set values", {
	        idBahan          : res['message'][0]['idBahan'],
	        namaBahan        : res['message'][0]['namaBahan'],
	        keteranganBahan  : res['message'][0]['keteranganBahan'],
	        // gambarBahan: res[0]['gambarBahan']
	      });
      } else {
      	// error
      }
    });
  }

  // simpan
  public simpan() {
  	console.log('simpan');
    // cek validasi form
    if ($("#form-ubah-data-bahan").form('is valid')) {
      // form valid
      // add class loading
  		$('#simpan-ubah-data-bahan').addClass('loading');
      // get value form
      var value = $('#form-ubah-data-bahan').form('get values');
      // set file
      var fileGambar = this.fileGambar.nativeElement;
      // set form data
      var formData = new FormData();
      // cek files
      if (fileGambar.files && fileGambar.files[0]) {
        formData.append('idBahan', value.idBahan);
        formData.append('namaBahan', value.namaBahan);
        formData.append('keteranganBahan', value.keteranganBahan);
        formData.append('gambarBahan', fileGambar.files[0]);
      } else {
        formData.append('idBahan', value.idBahan);
        formData.append('namaBahan', value.namaBahan);
        formData.append('keteranganBahan', value.keteranganBahan);
        formData.append('gambarBahan', this.data[0]['gambarBahan']);
      }

      // send data
      this.bahan.ubahData(formData).subscribe((res) => {
        console.log(res);
      	if (res['status']) {
      		console.log(res['message']);
          // notif
          this.notif.notif(true, res['status'], res['message']);
          // remove class loading
	        $('#simpan-ubah-data-bahan').removeClass('loading');
        } else {
        	// error
        	console.log(res['message']);
          // notif
          this.notif.notif(true, res['status'], res['message']);
          // remove class loading
	         $('#simpan-ubah-data-bahan').removeClass('loading');
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
