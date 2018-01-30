import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PengelolaService } from '../pengelola.service';
import { MessageService } from '../message.service';
declare var $:any;


@Component({
  selector: 'app-pengelola-ubah',
  templateUrl: './pengelola-ubah.component.html',
  styleUrls: ['./pengelola-ubah.component.css']
})
export class PengelolaUbahComponent implements OnInit {


  private usernameLama;

  constructor(private pengelola: PengelolaService, private activeRoute: ActivatedRoute, private notif: MessageService) { }

  ngOnInit() {
  	// init form
  	$("#form-ubah-data-pengelola").form({
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
		$("#simpan-ubah-data-pengelola").on("click", function() {
			$("#button-simpan").trigger('click');
		});

		// init dropdown
    $('#bagian').dropdown();

    // load berdasarkan id
  	// get id dari url
  	this.activeRoute.params.subscribe((params) => {
  		console.log('id', params['id']);
      // load data berdasarkan id
      this.usernameLama = params['id'];
      this.load(params['id']);
  	});
  }

  // load data berdasarkan id
  private load(username) {
    // load data
    this.pengelola.loadDataById(username).subscribe((res) => {
     	console.log(res);
      // cek status response
      if (res['status']) {
      	// set data to form
	      $('#form-ubah-data-pengelola').form('set values', {
	        username	: res['message'][0]['username'],
	        namaPengelola: res['message'][0]['namaPengelola'],
	        tipe: res['message'][0]['tipe'],
	        password: res['message'][0]['password'],
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
  	if ($("#form-ubah-data-pengelola").form('is valid')) {
  		// form valid
  		// add class loading
  		$('#simpan-ubah-data-pengelola').addClass('loading');
  		// get value form
  		var value = $('#form-ubah-data-pengelola').form('get values');
  		console.log(value);
      value.usernameLama = this.usernameLama;
  		// send
  		this.pengelola.ubahData(value).subscribe((res) => {
  			if (res['status']) {
  				console.log(res['message']);
          // notif
          this.notif.notif(true, res['status'], res['message']);
  				// remove class loading
	        $('#simpan-ubah-data-pengelola').removeClass('loading');
  			} else {
  				// error
          console.log(res['message']);
          // notif
          this.notif.notif(true, res['status'], res['message']);
          // remove class loading
          $('#simpan-ubah-data-pengelola').removeClass('loading');
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
