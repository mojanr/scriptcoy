import { Component, OnInit, ViewChild } from '@angular/core';
import { ModelService } from '../model.service';
import { MessageService } from '../message.service';
declare var $:any;

@Component({
  selector: 'app-model-tambah',
  templateUrl: './model-tambah.component.html',
  styleUrls: ['./model-tambah.component.css']
})
export class ModelTambahComponent implements OnInit {

	// view child input file
	@ViewChild('fileGambar') fileGambar;
	@ViewChild('fileModel3d') fileModel3d;

  constructor(private model: ModelService, private notif: MessageService) { }

  ngOnInit() {
  	// init form
  	$("#form-tambah-data-model").form({
			on: "blur",
			fields: {
				idModel: {
          identifier: 'idModel',
          rules: [
            {
              type: 'empty',
              prompt: 'Field id model tidak boleh kosong!'
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
				namaModel: {
          identifier: 'namaModel',
          rules: [
            {
              type: 'empty',
              prompt: 'Field nama model tidak boleh kosong!'
            }
          ]
        },
				keteranganModel: {
          identifier: 'keteranganModel',
          rules: [
            {
              type: 'empty',
              prompt: 'Field keterangan tidak boleh kosong!'
            }
          ]
        },
				hargaModel: {
          identifier: 'hargaModel',
          rules: [
            {
              type: 'empty',
              prompt: 'Field harga model tidak boleh kosong!'
            },
            {
              type   : 'integer[0..9999999]',
              prompt : 'Field harga model tidak boleh kurang dari 0'
            }
          ]
        },
				gambarModel: {
          identifier: 'gambarModel',
          rules: [
            {
              type: 'empty',
              prompt: 'Field gambar model tidak boleh kosong!'
            }
          ]
        },
				model3d: {
          identifier: 'model3d',
          rules: [
            {
              type: 'empty',
              prompt: 'Field model 3d tidak boleh kosong!'
            }
          ]
        }
			}
		});

		// init submit click
		$("#simpan-tambah-data-model").on("click", function() {
			$("#button-simpan").trigger('click');
		});

    // init dropdown
    $('#bagian-gitar').dropdown();

    // load id
		this.load();
  }

  // load id
  private load() {
  	// load new id
  	this.model.getNewId().subscribe((res) => {
  		console.log(res);
      // cek status response
      if (res['status']) {
      	// set id form
	  		$("#form-tambah-data-model").form("set values", {
	        idModel: res['message'][0]['idModel']
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
  	if ($("#form-tambah-data-model").form('is valid')) {
  		// form valid
  		// add class loading
  		$('#simpan-tambah-data-model').addClass('loading');
  		// get value form
  		var value = $('#form-tambah-data-model').form('get values');
  		// set file
  		var fileGambar = this.fileGambar.nativeElement;
  		var fileModel3d = this.fileModel3d.nativeElement;
  		// cek file
  		if (fileGambar.files && fileGambar.files[0] && fileModel3d.files && fileModel3d.files[0]) {
  			// set form data
  			var formData = new FormData();
  			formData.append('idModel', value.idModel);
  			formData.append('bagianGitar', value.bagianGitar);
  			formData.append('namaModel', value.namaModel);
  			formData.append('keteranganModel', value.keteranganModel);
  			formData.append('hargaModel', value.hargaModel);
  			formData.append('gambarModel', fileGambar.files[0]);
  			formData.append('model3d', fileModel3d.files[0]);
  			// send data
  			this.model.tambahData(formData).subscribe((res) => {
  				if (res['status']) {
	  				console.log(res['message']);
            // notif
            this.notif.notif(true, res['status'], res['message']);
	  				// remove class loading
		        $('#simpan-tambah-data-model').removeClass('loading');
	  				// clear form
          	$("#form-tambah-data-model").form('clear');
	  				// load new id
	       		this.load();
	  			} else {
	  				// error
	          console.log(res['message']);
            // notif
            this.notif.notif(true, res['status'], res['message']);
	          // remove class loading
	          $('#simpan-tambah-data-model').removeClass('loading');
	  			}
        });
  		}
  	} else {
  		// console.log('field tidak boleh kosong');
      // notif
      setTimeout(() => {
        var message = $('#hidden-message').html();
        this.notif.notif(true, false, message);
      }, 50);
  	}
  }
}
