import { Component, OnInit, ViewChild } from '@angular/core';
import { BahanService } from '../bahan.service';
import { MessageService } from '../message.service';
declare var $:any;

@Component({
  selector: 'app-bahan-tambah',
  templateUrl: './bahan-tambah.component.html',
  styleUrls: ['./bahan-tambah.component.css']
})
export class BahanTambahComponent implements OnInit {

	// view child input file
	@ViewChild('fileGambar') fileGambar;

  constructor(private bahan: BahanService, private notif: MessageService) { }

  ngOnInit() {
  	// init form
  	$("#form-tambah-data-bahan").form({
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
              prompt: 'Field keterangan tidak boleh kosong!'
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
				gambarBahan: {
          identifier: 'gambarBahan',
          rules: [
            {
              type: 'empty',
              prompt: 'Field gambar bahan tidak boleh kosong!'
            }
          ]
        }
			}
		});

		// init submit click
		$("#simpan-tambah-data-bahan").on("click", function() {
			$("#button-simpan").trigger('click');
		});

		// load id
		this.load();
  }

  // load data
  private load() {
  	// load data
    this.bahan.getNewId().subscribe((res) => {
    	console.log(res);
      // cek status response
      if (res['status']) {
      	// set id
      	$("#form-tambah-data-bahan").form("set values", {
					idBahan: res['message'][0]['idBahan']
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
  	if ($("#form-tambah-data-bahan").form('is valid')) {
  		// form valid
  		// add class loading
  		$('#simpan-tambah-data-bahan').addClass('loading');
      // get value form
  		var value = $('#form-tambah-data-bahan').form('get values');
  		// set file
  		var fileGambar = this.fileGambar.nativeElement;
      // cek files
  		if (fileGambar.files && fileGambar.files[0]) {
        // set form data
  			var formData = new FormData();
  			formData.append('idBahan', value.idBahan);
  			formData.append('namaBahan', value.namaBahan);
  			formData.append('keteranganBahan', value.keteranganBahan);
  			formData.append('gambarBahan', fileGambar.files[0]);
        // send data
  			this.bahan.tambahData(formData).subscribe((res) => {
          if (res['status']) {
          	console.log(res['message']);
            // notif
            this.notif.notif(true, res['status'], res['message']);
          	// remove class loading
	          $('#simpan-tambah-data-bahan').removeClass('loading');
	          // clear form
	          $("#form-tambah-data-bahan").form('clear');
	          // load new id
	          this.load();
          } else {
          	// error
          	console.log(res['message']);
            // notif
            this.notif.notif(true, res['status'], res['message']);
          	// remove class loading
          	$('#simpan-tambah-data-bahan').removeClass('loading');
          }
        });
  		}
  	} else {
  		// console.log('Field tidak boleh kosong!');
    //   // notif
    //   this.notif.notif(true, false, 'Field tidak boleh kosong!');
  	  setTimeout(() => {
        var message = $('#hidden-message').html();
        this.notif.notif(true, false, message);
      }, 50);
    }
  }

}
