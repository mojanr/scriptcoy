import { Component, OnInit } from '@angular/core';
import { PengelolaService } from '../pengelola.service';
import { MessageService } from '../message.service';
declare var $:any;

@Component({
  selector: 'app-pengelola-tambah',
  templateUrl: './pengelola-tambah.component.html',
  styleUrls: ['./pengelola-tambah.component.css']
})
export class PengelolaTambahComponent implements OnInit {

  constructor(private pengelola: PengelolaService, private notif: MessageService) { }

  ngOnInit() {
  	// init form
  	$("#form-tambah-data-pengelola").form({
			on: "blur",
			fields: {
				username: {
          identifier: 'username',
          rules: [
            {
              type: 'empty',
              prompt: 'Field username tidak boleh kosong!'
            }
          ]
        },
				namaPengelola: {
          identifier: 'namaPengelola',
          rules: [
            {
              type: 'empty',
              prompt: 'Field nama pengelola tidak boleh kosong!'
            }
          ]
        },
				tipe: {
          identifier: 'tipe',
          rules: [
            {
              type: 'empty',
              prompt: 'Field tipe pengelola tidak boleh kosong!'
            }
          ]
        }
			}
		});

		// init submit click
		$("#simpan-tambah-data-pengelola").on("click", function() {
			$("#button-simpan").trigger('click');
		});

		// init dropdown
    $('#bagian').dropdown();

    // load id
		// this.load();
  }

  // // load id
  // private load() {
  // 	// load new id
  // 	this.pengelola.getNewId().subscribe((res) => {
  // 		console.log(res);
  //     // cek status response
  //     if (res['status']) {
  //     	// set id form
	 //  		$("#form-tambah-data-pengelola").form("set values", {
	 //        username: res['message'][0]['username']
	 //      });
  //     } else {
  //     	// error
  //     }
  // 	});
  // }

  // simpan
  public simpan() {
  	console.log('simpan');
  	// cek validasi form
  	if ($("#form-tambah-data-pengelola").form('is valid')) {
  		// form valid
  		// add class loading
  		$('#simpan-tambah-data-pengelola').addClass('loading');
  		// get value form
  		var value = $('#form-tambah-data-pengelola').form('get values');
  		console.log(value);
  		// send
  		this.pengelola.tambahData(value).subscribe((res) => {
  			if (res['status']) {
  				console.log(res['message']);
          // notif
          this.notif.notif(true, res['status'], res['message']);
  				// remove class loading
	        $('#simpan-tambah-data-pengelola').removeClass('loading');
  				// clear form
  				$("#form-tambah-data-pengelola").form('clear');
  				// load new id
       		// this.load();
  			} else {
  				// error
          console.log(res['message']);
          // notif
          this.notif.notif(true, res['status'], res['message']);
          // remove class loading
          $('#simpan-tambah-data-pengelola').removeClass('loading');
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
