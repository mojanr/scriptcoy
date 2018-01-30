import { Component, OnInit, HostListener, ViewChild, ElementRef } from '@angular/core';
import { ThreeService } from '../three.service';
import { GitarService } from '../gitar.service';
declare var $: any;

@Component({
  selector: 'app-design',
  templateUrl: './design.component.html',
  styleUrls: ['./design.component.css']
})
export class DesignComponent implements OnInit {

	// total harga
  public totalHarga = 0;
  // message
  public message = {
    status: true,
    message: null,
    show: false
  };

  // sidebar setting menu
  public setting = {
    generalOptions: false,
    body: false,
    bridgePin: false,
    bridge: false,
    fingerboard: false,
    fret: false,
    inlay: false,
    logo: false,
    neckDanHeadstock: false,
    nut: false,
    pickguard: false,
    rosette: false,
    saddle: false,
    tuningMachine: false,
    string: false,
  };

  // data bagian gitar
  public data = null;

  // data gitar pesanan
  public info = null;


  // div container element
	@ViewChild('canvas') canvas:ElementRef;

  constructor(private three: ThreeService, private gitar: GitarService) {
  	// set data
  	this.data = this.gitar.getData();
    // set info gitar
    this.info = this.gitar.getInfo();
    // load data body
    // load data base model body
    this.gitar.loadDataModel('body', (res) => {
      console.log('data body', res);
      // set data body model
      this.data.body.model = res['message'];
      // load data bahan top
      this.gitar.loadDataBahan('body top', (res) => {
        this.data.body.bahan.top = res['message'];
      });
      // load data bahan side dan back
      this.gitar.loadDataBahan('body side dan back', (res) => {
        this.data.body.bahan.sideDanBack = res['message'];
      });
      // load data bahan binding
      this.gitar.loadDataBahan('body binding', (res) => {
        this.data.body.bahan.binding = res['message'];
      });

      // show modal pilih base model
      setTimeout(() => {
        $('#base-model-modal').modal('show');
        $('[data-id]').each(function() {
          var $el = $(this);
          $el.popup({
            boundary: '#base-model-modal',
            position : 'bottom left',
          });
        });
      }, 700);
    });
  }

  ngOnInit() {
    // init form
    // init form
    $("#form-pemesanan").form({
      on: "blur",
      fields: {
        namaPemesan: {
          identifier: 'namaPemesan',
          rules: [
            {
              type: 'empty',
              prompt: 'Please fill your name!'
            }
          ]
        },
        noTelp: {
          identifier: 'noTelp',
          rules: [
            {
              type: 'empty',
              prompt: 'Please fill your phone number!'
            },
            {
              type: 'integer',
              prompt: 'Please fill your phone number!'
            }
          ]
        },
        email: {
          identifier: 'email',
          rules: [
            {
              type: 'empty',
              prompt: 'Please fill your email!'
            },
            {
              type: 'email',
              prompt: 'Please fill your correct email!'
            }
          ]
        },
        alamat: {
          identifier: 'alamat',
          rules: [
            {
              type: 'empty',
              prompt: 'Please fill your address!'
            }
          ]
        },
        lamaPembuatan: {
          identifier: 'lamaPembuatan',
          rules: [
            {
              type: 'empty',
              prompt: 'Please fill your guitar build!'
            }
          ]
        }
      }
    });

    // init dropdown
    $('#guitar-finishing').dropdown('set selected', 'Gloss');
    $('#guitar-finishing').dropdown({
        onChange: (val) => {
          this.setFinishing(val)
        }
    });

    // init
    $('#lama-pembuatan').dropdown();

    // init dropdpwn finish

    // // init submit click
    // $("#simpan-tambah-data-bahan").on("click", function() {
    //   $("#button-simpan").trigger('click');
    // });


  	// init sidebar
    $('#sidebar-setting')
    .sidebar({
      context: $('#pusher-1'),
      transition: 'overlay',
      dimPage: false,
      closable: false
    });

    // init modal
  	$('#base-model-modal').modal('setting', 'closable', false);

    // init tab order
    $('#tab-order .item').tab();

    // click active menu
    $('#sidebar-part a.item').on('click', function() {
      // reset
      $('#sidebar-part a.item .ui.header').each(function() {
        $(this).removeClass('orange');
      });
      $(this).children('.ui.header').addClass('orange');
    }); 

    // click active model dan material
    $(document).on('click', '#img', function() {
      $(this).next().removeClass('img-active');
      $(this).prev().removeClass('img-active');
      // reset 
      $(this).parent().find('#img').each(function() {
        $(this).removeClass('img-active');
      });
      $(this).addClass('img-active');
    });

    // load data bridge prin
    this.loadData('bridgePin');
    // load data bridge
    this.loadData('bridge');
    // load data fingerboard
    this.loadData('fingerboard');
    // load data fret
    this.loadData('fret');
    // load data inlay
    this.loadData('inlay');
    // load data logo
    this.loadData('logo');
    // load data neckDanHeadstock
    this.loadData('neckDanHeadstock');
    // load data nut
    this.loadData('nut');
    // load data pickguard
    this.loadData('pickguard');
    // load data rosette
    this.loadData('rosette');
    // load data saddle
    this.loadData('saddle');
    // load data tuningMachine
    this.loadData('tuningMachine');
    // load data string
    this.loadData('string');
  }

  // init three js
  ngAfterViewInit() {
  	this.three.initScene();
  	this.three.initCamera(this.canvas.nativeElement);
  	this.three.initRenderer(this.canvas.nativeElement);
  	// this.three.initHelper();
  	this.three.initLightning();
		this.three.initControls();
		this.three.run();
    // set orientation
    this.setOrientation('right handed');
  }  

  // window resize listener
 	@HostListener('window:resize', ['$event'])
	onWindowResize(event) {
		this.three.resize(this.canvas.nativeElement);
    // this.three.setView('front');
	}

  // load data
  private loadData(bagianGitar) {
    var target;
    switch (bagianGitar) {
      case "bridgePin":
        target = 'bridge pin';
        break;
      case "neckDanHeadstock":
        target = 'neck dan headstock';
        break;
      case "tuningMachine":
        target = 'tuning machine';
        break;
      default:
        target = bagianGitar;
        break;
    }

    // load data string
    this.gitar.loadDataModel(target, (res) => {
      console.log(`data ${target}`, res);
      // set data string model
      this.data[bagianGitar].model = res['message'];
      // set default string
      this.gitar.setInfoModel(bagianGitar, res['message'][0]);
      this.gitar.setModel(bagianGitar);
      // load data bahan
      this.gitar.loadDataBahan(target, (res) => {
        this.data[bagianGitar].bahan = res['message'];
      });
    });
  }

	// click base model
	public setBaseModel(bagianGitar, data) {
		// set info
    this.gitar.setInfoModel(bagianGitar, data);
    this.gitar.setModel(bagianGitar);
    this.totalHarga = this.gitar.getInfo().totalHarga;
		// remove modal
		$('#base-model-modal').modal('hide');
	}

	// popup helper 
  public popupHelper(nama, harga) {
    return `
      <h5 class="ui header"> 
        <div class="content">
          ${nama}
          <div class="sub header"> <i> Rp. ${harga} </i> </div>
        </div>
      </h5>
    `;
  }

  // img model active helper
  public imgActiveHelper(bagianGitar, data) {
    if (this.info.gitar[bagianGitar].model) {
      var result = this.info.gitar[bagianGitar].model.idModel == data.idModel;
      return {'img-active': result};
    }
  }

  // open setting sidebar
  public openSetting(setting) {
    // cek sidebar active
    if ($('#sidebar-setting').sidebar('is visible')) {
      $('#sidebar-setting').sidebar('hide', () => {

        // reset setting
        this.resetSetting();
        // set setting status
        this.setting[setting] = true;

        // setTimeout(() => {
          $('#sidebar-setting').sidebar('show');
        // },70);
      });
    } else {

      // reset setting
      this.resetSetting();
      // set setting status
      this.setting[setting] = true;

      // setTimeout(() => {
        $('#sidebar-setting').sidebar('show');
      // },30);
    }

    this.three.focus(setting);

    $('[data-id]').each(function() {
      var $el = $(this);
      $el.popup({
        boundary: '#sidebar-setting',
        position : 'bottom left',
      });
    });
  }

  // close setting sidebar
  public closeSetting() {
    $('#sidebar-setting').sidebar('hide');
    $('#sidebar-part a.item .ui.header').each(function() {
      $(this).removeClass('orange');
    });
    this.three.resetView();
  }

  // reset setting
  private resetSetting() {
    for (let [key, value] of Object.entries(this.setting)) {
      this.setting[key] = false;
    }
  }

  // public canvas click 
  public canvasClick(event) {
    // this.three.getObjectOnClick(event, (bagianGitar) => {
    //   // console.log(obj.name);
    //   this.openSetting(bagianGitar);
    // });
  }

  // set view
  public setView(view) {
    this.closeSetting();
    this.three.setView(view);
  }


  // set model
  public setModel(bagianGitar, data) {
  	console.log('set model', bagianGitar, data);
  	this.gitar.setInfoModel(bagianGitar, data);
  	this.gitar.setModel(bagianGitar);
    this.totalHarga = this.gitar.getInfo().totalHarga;
  }

  // set bahan
  public setBahan(bagianGitar, data) {
  	console.log('set bahan', bagianGitar, data);
  	this.gitar.setInfoBahan(bagianGitar, data);
  	this.gitar.setBahan(bagianGitar);
    this.totalHarga = this.gitar.getInfo().totalHarga;
  }

  // modal pesan 
  public openModalPesan() {
    this.message.show = false;
    this.three.resetView();
  	$('#pemesanan-modal').modal('show');
    // $('#tab-order').tab();
    var img = this.three.snapshot('front');
    $('#snapshot-img').html('').append(img);
  }

  // snapshot
  // public snapshot() {
  //   var img = this.three.snapshot('front');
  //   $('#coba-snapshot').append(img);
  // }

  // pesan gitar
  public pesan() {
  	console.log('pesan');
    // $('#form-pemesanan').removeClass('error');
    $('#form-pemesanan').form('submit');
  	// validasi form
    if ($('#form-pemesanan').form('is valid')) {
      // get data form
      var value = $('#form-pemesanan').form('get values');
      var gitar = this.info.gitar;
      console.log(gitar);
      // var statusValidasi = {};
      // validasi data gitar
      for (let [key, value] of Object.entries(gitar)) {
        // cek jika model logo, inlay, rosette, dan pickguard null, maka oke
        if (key == 'body') {
          if (!gitar[key].bahan.top) {
            console.log('tidak valid belum di setting');
            this.message.status = false;
            this.message.message = 'Your body top material is not yet chosen!';
            this.message.show = true;
            // $('#hidden-message').append('<li> Your body top material is not yet chosen! </li>');
            return false;
          }
          if (!gitar[key].bahan.sideDanBack) {
            console.log('tidak valid belum di setting');
            this.message.status = false;
            this.message.message = 'Your body side and back material is not yet chosen!';
            this.message.show = true;
            // $('#hidden-message').append('<li> Your body side and back material is not yet chosen! </li>');
            return false;
          }
          if (!gitar[key].bahan.binding) {
            console.log('tidak valid belum di setting');
            this.message.status = false;
            this.message.message = 'Your body binding material is not yet chosen!';
            this.message.show = true;
            // $('#hidden-message').append('<li> Your body binding material is not yet chosen! </li>');
            return false;
          }
        } else if (key == 'logo' || key == 'inlay' || key == 'rosette' || key == 'pickguard') {
          if (value.model) {
            if (!value.bahan) {
              console.log('tidak valid belum di setting');
              this.message.status = false;
              this.message.message = `Your ${key} material is not yet chosen!`;
              this.message.show = true;
              // $('#hidden-message').append(`<li> Your ${key} material is not yet chosen! </li>`);
              return false;
            }
          }
        } else if (key == 'nut' || key == 'fret' || key == 'saddle' || key == 'bridgePin' || key == 'string' || key == 'tuningMachine') {
          // oke valid
        } else {
          if (!value.bahan) {
            console.log('tidak valid belum di setting');
            this.message.status = false;
            this.message.message = `Your ${key} material is not yet chosen!`;
            this.message.show = true;
            // $('#hidden-message').append(`<li> Your ${key} material is not yet chosen! </li>`);
            return false;
          }
        }
      }

      var dataGitar = {
        model: [],
        bahan: []
      };
      // set array id
      for (let [key, value] of Object.entries(gitar)) {
        if (key == 'body') {
          // add model
          dataGitar.model.push(value.model.idModel);
          // add bahan
          dataGitar.bahan.push(value.bahan.top.idHargaBahan);
          dataGitar.bahan.push(value.bahan.sideDanBack.idHargaBahan);
          dataGitar.bahan.push(value.bahan.binding.idHargaBahan);
        } else {
          if (value.model) {
            dataGitar.model.push(value.model.idModel);
            if (value.bahan) {
              dataGitar.bahan.push(value.bahan.idHargaBahan);
            }
          }
        }
      }

      console.log('valid');
      // set data value
      value.gitar = Object.assign({}, this.gitar.getInfo());
      value.gitar.gitar = dataGitar;
      console.log('data pemesanan', value);
      var data = {
        data: JSON.stringify(value)
      }
      // console.log(data);
      // add class loading
      $('#submit-order').addClass('loading');
      // send data
      this.gitar.pesan(data).subscribe((res) => {
        console.log(res);
        if (res['status']) {
          // success
          // remove class loading
          $('#submit-order').removeClass('loading');
          // clear form
          $("#form-pemesanan").form('clear');
          // close modal
          // $('#pemesanan-modal').modal('hide');
          this.message.status = true;
          this.message.message = 'Success order is in process!';
          this.message.show = true;
        } else {
          // error
          // remove class loading
          $('#submit-order').removeClass('loading');
          // clear form
          $("#form-pemesanan").form('clear');
          // close modal
          // $('#pemesanan-modal').modal('hide');
          this.message.status = false;
          this.message.message = res['message'];
          this.message.show = true;
        }
      });
    } else {
      console.log('field tidak boleh kosong');
      // this.message.status = false;
      // this.message.message = 'Fill the empty field!';

      // $('#form-pemesanan').addClass('error');
    }
  }

  public dataGitarHelper(data) {
    try {
      return data.namaModel || data.namaBahan;
    } catch(e) {
      return '-';
    }
  }

  public closePemesananModel() {
    $('#pemesanan-modal').modal('hide');
    this.message.status = null;
    this.message.show = false;
    $('#form-pemesanan').form('reset');
    $('#form-pemesanan').removeClass('error');
  }

  public setFinishing(value) {
    this.gitar.setFinishing(value);
    console.log('finishing', value);
  }

  public setOrientation(value) {
    this.gitar.setOrientasi(value);
    this.three.flip(value);
    console.log('orientation', value);
  }
}
