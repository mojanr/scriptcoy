import { Component, OnInit, HostListener, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ThreeService } from '../three.service';
import { GitarService } from '../gitar.service';
import { PesananService } from '../pesanan.service';
declare var $:any;

@Component({
  selector: 'app-pesanan-detail',
  templateUrl: './pesanan-detail.component.html',
  styleUrls: ['./pesanan-detail.component.css']
})
export class PesananDetailComponent implements OnInit {

	// data detail
	public data = {
		idPesanan: null,
    tglPesan: null,
    namaPemesan: null,
    alamat: null,
    noTelp: null,
    email: null,
    totalHarga: null,
    tglDeadline: null,
    finishing: null,
		gitar: null
	};

	// this.info
	public info;

	// div container element
	@ViewChild('canvas') canvas:ElementRef;

  constructor(private pesanan: PesananService, private three: ThreeService, private gitar: GitarService, private activeRoute: ActivatedRoute) {
  	// set data
  	// this.data = this.gitar.getData();
  	// set info
  	this.info = this.gitar.getInfo();
  }

  ngOnInit() {
  	// $('.tabular.menu .item').tab();

  	// load data
    this.activeRoute.params.subscribe((params) => {
      console.log('id', params['id']);
      // load data berdasarkan id
      this.load(params['id']);
    });
  }

  // init three js
  ngAfterViewInit() {
  	this.three.initScene();
  	this.three.initCamera(this.canvas.nativeElement);
  	this.three.setCameraUp();
  	this.three.initRenderer(this.canvas.nativeElement);
  	// this.three.initHelper();
  	this.three.initLightning();
		this.three.initControls();
		this.three.run();
  }

  // window resize listener
 	@HostListener('window:resize', ['$event'])
	onWindowResize(event) {
		this.three.resize(this.canvas.nativeElement);
    // this.three.setView('front');
	}

  // load data
  private load(idPesanan) {
    this.pesanan.loadDataById(idPesanan).subscribe((res) => {
    	// console.log(res);
    	// cek status response
    	if (res['status']) {
    		// set data
    		this.data = res['message'][0];
    		console.log(this.data);
    		// load model

    		this.data.gitar.model.forEach((item) => {
    			var bagianGitar = this.toCamelCase(item.bagianGitar);
    			// set model
    			this.setModel(bagianGitar, item);
    		});

    		this.data.gitar.bahan.forEach((item) => {
    			var bagianGitar = this.toCamelCase(item.bagianGitar);
    			if (bagianGitar.includes('bodyTop')) {
    				bagianGitar = 'top';
    			} else if (bagianGitar.includes('bodySideDanBack')) {
    				bagianGitar = 'sideDanBack';
    			} else if (bagianGitar.includes('bodyBinding')) {
    				bagianGitar = 'binding';
    			}
    			// set bahan
    			this.setBahan(bagianGitar, item);
    		});
    		console.log(this.info);
    	} else {
    		// error
    	}
    });
  }

  // set view
  private setView(view) {
    this.three.setView(view);
  }

  // set model
  private setModel(bagianGitar, data) {
  	console.log('set model', bagianGitar, data);
  	this.gitar.setInfoModel(bagianGitar, data);
  	this.gitar.setModel(bagianGitar);
    // this.totalHarga = this.gitar.getInfo().totalHarga;
  }

  // set bahan
  private setBahan(bagianGitar, data) {
  	console.log('set bahan', bagianGitar, data);
  	this.gitar.setInfoBahan(bagianGitar, data);
  	this.gitar.setBahan(bagianGitar);
    // this.totalHarga = this.gitar.getInfo().totalHarga;
  }

  private toCamelCase(str) {
	  var result = str.toLowerCase().replace(/(?:(^.)|(\s+.))/g, function(match) {
	  	return match.charAt(match.length-1).toUpperCase();
	  });
	  return result[0].toLowerCase() + result.substring(1);
  }

  public dataGitarHelper(data) {
  	try {
  		return data.namaModel || data.namaBahan;
  	} catch(e) {
  		return '-';
  	}
  	// return data.namaModel || data.namaBahan || '';
  }

}
