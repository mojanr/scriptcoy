import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModelService } from '../model.service';
import { MessageService } from '../message.service';
declare var $:any;

@Component({
  selector: 'app-model-ubah',
  templateUrl: './model-ubah.component.html',
  styleUrls: ['./model-ubah.component.css']
})
export class ModelUbahComponent implements OnInit {
	// attribute
	public data;
	// view child input file
	@ViewChild('fileGambar') fileGambar;
	@ViewChild('fileModel3d') fileModel3d;

  constructor(private model: ModelService, private activeRoute: ActivatedRoute, private notif: MessageService) { }

  ngOnInit() {
  	// init form
    $("#form-ubah-data-model").form({
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
        // gambarModel: {
        //   identifier: 'gambarModel',
        //   rules: [
        //     {
        //       type: 'empty',
        //       prompt: 'Field gambar model tidak boleh kosong!'
        //     }
        //   ]
        // },
        // model3d: {
        //   identifier: 'model3d',
        //   rules: [
        //     {
        //       type: 'empty',
        //       prompt: 'Field model 3d tidak boleh kosong!'
        //     }
        //   ]
        // }
      }
    });

    // init submit click
    $("#simpan-ubah-data-model").on("click", function() {
      $("#button-simpan").trigger('click');
    });

    // init dropdown
    $('#bagian-gitar').dropdown();

    // load data
    this.activeRoute.params.subscribe((params) => {
      console.log('id', params['id']);
      // load data berdasarkan id
      this.load(params['id']);
    });
  }

  // load data
  private load(idModel) {
  	// load data
  	this.model.loadDataById(idModel).subscribe((res) => {
  		console.log(res);
      // cek status response
      if (res['status']) {
      	// set data
	  		this.data = res['message'];
	  		// set data to form
	  		$('#form-ubah-data-model').form('set values', {
	  			idModel					: res['message'][0]['idModel'],
					bagianGitar			: res['message'][0]['bagianGitar'],
					namaModel				: res['message'][0]['namaModel'],
					keteranganModel	: res['message'][0]['keteranganModel'],
					hargaModel			: res['message'][0]['hargaModel'],
					// gambarModel: res[0]['gambarModel'],
					// model3d: res[0]['model3d']
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
  	if ($("#form-ubah-data-model").form('is valid')) {
  		console.log('valid');
  		// form valid
  		// add class loading
  		$('#simpan-ubah-data-model').addClass('loading');
  		// get value form
  		var value = $('#form-ubah-data-model').form('get values');
  		// set file
  		var fileGambar = this.fileGambar.nativeElement;
  		var fileModel3d = this.fileModel3d.nativeElement;
  		// set form data
  		var formData = new FormData();
  		// cek file
  		if ((fileGambar.files && fileGambar.files[0]) || (fileModel3d.files && fileModel3d.files[0])) {
  			formData.append('idModel', value.idModel);
  			formData.append('bagianGitar', value.bagianGitar);
  			formData.append('namaModel', value.namaModel);
  			formData.append('keteranganModel', value.keteranganModel);
  			formData.append('hargaModel', value.hargaModel);
  			formData.append('gambarModel', fileGambar.files[0]);
  			formData.append('model3d', fileModel3d.files[0]);
  		} else {
  			formData.append('idModel', value.idModel);
  			formData.append('bagianGitar', value.bagianGitar);
  			formData.append('namaModel', value.namaModel);
  			formData.append('keteranganModel', value.keteranganModel);
  			formData.append('hargaModel', value.hargaModel);
  			formData.append('gambarModel', this.data[0]['gambarModel']);
  			formData.append('model3d', this.data[0]['model3d']);
  		}

			// send data
			this.model.ubahData(formData).subscribe((res) => {
				console.log(res);
      	if (res['status']) {
      		console.log(res['message']);
          // notif
          this.notif.notif(true, res['status'], res['message']);
          // remove class loading
	        $('#simpan-ubah-data-model').removeClass('loading');
        } else {
        	// error
        	console.log(res['message']);
          // notif
          this.notif.notif(true, res['status'], res['message']);
          // remove class loading
	         $('#simpan-ubah-data-model').removeClass('loading');
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
