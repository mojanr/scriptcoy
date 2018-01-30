import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ThreeService } from './three.service';
import { LoaderService } from './loader.service';
import { HttpHeaders } from '@angular/common/http';
import { Api } from './api';
declare var THREE:any;

@Injectable()
export class GitarService extends Api {

	// attribute
	private info = {
		orientasi: null,
		finishing: 'gloss',
		totalHarga: 0,
		gitar: {
			body: {
				model: null,
				bahan: {
					top: null,
					sideDanBack: null,
		      binding: null
				}
			},
			bridgePin: {
				model: null,
				bahan: null
			},
			bridge: {
				model: null,
				bahan: null
			},
			fingerboard: {
				model: null,
				bahan: null
			},
			fret: {
				model: null,
				bahan: null
			},
			inlay: {
				model: null,
				bahan: null
			},
			logo: {
				model: null,
				bahan: null
			},
			neckDanHeadstock: {
				model: null,
				bahan: null
			},
			nut: {
				model: null,
				bahan: null
			},
			pickguard: {
				model: null,
				bahan: null
			},
			rosette: {
				model: null,
				bahan: null
			},
			saddle: {
				model: null,
				bahan: null
			},
			tuningMachine: {
				model: null,
				bahan: null
			},
			string: {
				model: null,
				bahan: null
			}
		}
	}

	// prev selected id model
	private prevId = {
		body: null,
		bridgePin: null,
		bridge: null,
		fingerboard: null,
		fret: null,
		inlay: null,
		logo: null,
		neckDanHeadstock: null,
		nut: null,
		pickguard: null,
		rosette: null,
		saddle: null,
		tuningMachine: null,
		string: null
	}

	// data model dan bahan
	private data = {
		body: {
			model: null,
			bahan: {
				top: null,
				sideDanBack: null,
	      binding: null
			}
		},
		bridgePin: {
			model: null,
			bahan: null
		},
		bridge: {
			model: null,
			bahan: null
		},
		fingerboard: {
			model: null,
			bahan: null
		},
		fret: {
			model: null,
			bahan: null
		},
		inlay: {
			model: null,
			bahan: null
		},
		logo: {
			model: null,
			bahan: null
		},
		neckDanHeadstock: {
			model: null,
			bahan: null
		},
		nut: {
			model: null,
			bahan: null
		},
		pickguard: {
			model: null,
			bahan: null
		},
		rosette: {
			model: null,
			bahan: null
		},
		saddle: {
			model: null,
			bahan: null
		},
		tuningMachine: {
			model: null,
			bahan: null
		},
		string: {
			model: null,
			bahan: null
		}
	}

	// material
	private material = {
		body: {
			top: new THREE.MeshPhongMaterial({
							color: 0x999999,
							shininess: 40,
							reflectivity: 0.3,
							bumpScale: .0001,
							combine: THREE.MultiplyOperation,
							side: THREE.DoubleSide
						}),
			sideDanBack: new THREE.MeshPhongMaterial({
											color: 0x999999,
											shininess: 40,
											reflectivity: 0.3,
											bumpScale: .0001,
											combine: THREE.MultiplyOperation,
											side: THREE.DoubleSide
										}),
	    binding: new THREE.MeshPhongMaterial({
			            color: 0x777777,
			            shininess: 40,
			            reflectivity: 0.3,
			            bumpScale: .0001,
			            combine: THREE.MultiplyOperation,
			            side: THREE.DoubleSide
			          })
		},
		bridgePin: new THREE.MeshPhongMaterial({
									color: 0x777777,
									shininess: 30,
									reflectivity: 0.25,
									bumpScale: .0001,
									combine: THREE.MultiplyOperation,
									side: THREE.DoubleSide
							 	}),
		bridge: new THREE.MeshPhongMaterial({
												color: 0x777777,
												shininess: 30,
												reflectivity: 0.25,
												bumpScale: .0001,
												combine: THREE.MultiplyOperation,
												side: THREE.DoubleSide
											}),
		fingerboard: new THREE.MeshPhongMaterial({
												color: 0x777777,
												shininess: 30,
												reflectivity: 0.25,
												bumpScale: .0001,
												combine: THREE.MultiplyOperation,
												side: THREE.DoubleSide
											}),
		fret: new THREE.MeshPhongMaterial({
												color: 0xffffff,
                        roughness: 0.4,
                        metalness: 1.0,
												shininess: 30,
												reflectivity: 0.25,
												bumpScale: .0001,
												combine: THREE.MultiplyOperation,
												side: THREE.DoubleSide
										 }),
		inlay: new THREE.MeshPhongMaterial({
												color: 'white',
												shininess: 30,
												reflectivity: 0.25,
												bumpScale: .0001,
												combine: THREE.MultiplyOperation,
												side: THREE.DoubleSide
											}),
		logo: new THREE.MeshPhongMaterial({
												color: 'white',
												shininess: 30,
												reflectivity: 0.25,
												bumpScale: .0001,
												combine: THREE.MultiplyOperation,
												side: THREE.DoubleSide
											}),
		neckDanHeadstock: new THREE.MeshPhongMaterial({
												color: 0x555555,
												shininess: 30,
												reflectivity: 0.25,
												bumpScale: .0001,
												combine: THREE.MultiplyOperation,
												side: THREE.DoubleSide
											}),
		nut: new THREE.MeshPhongMaterial({
												color: 0xe3dcc9,
												shininess: 30,
												reflectivity: 0.25,
												bumpScale: .0001,
												combine: THREE.MultiplyOperation,
												side: THREE.DoubleSide
										 }),
		pickguard: new THREE.MeshPhongMaterial({
												color: 0x555555,
												shininess: 30,
												reflectivity: 0.25,
												bumpScale: .0001,
												combine: THREE.MultiplyOperation,
												side: THREE.DoubleSide
											}),
		rosette: new THREE.MeshPhongMaterial({
												color: 'white',
												shininess: 30,
												reflectivity: 0.25,
												bumpScale: .0001,
												combine: THREE.MultiplyOperation,
												side: THREE.DoubleSide
											}),
		saddle: new THREE.MeshPhongMaterial({
												color: 0xe3dcc9,
												shininess: 30,
												reflectivity: 0.25,
												bumpScale: .0001,
												combine: THREE.MultiplyOperation,
												side: THREE.DoubleSide
										 }),
		tuningMachine: new THREE.MeshPhongMaterial({
												color: 'white',
												shininess: 30,
												reflectivity: 0.25,
												bumpScale: .0001,
												combine: THREE.MultiplyOperation,
												side: THREE.DoubleSide
										 }),
		string: new THREE.MeshPhongMaterial({
												color: 'white',
												shininess: 30,
												reflectivity: 0.25,
												bumpScale: .0001,
												combine: THREE.MultiplyOperation,
												side: THREE.DoubleSide
										 })
	}

	// texture
	private texture = {
		body: {
			top: null,
			sideDanBack: null,
	    binding: null
		},
		bridgePin: null,
		bridge: null,
		fingerboard: null,
		fret: null,
		inlay: null,
		logo: null,
		neckDanHeadstock: null,
		nut: null,
		pickguard: null,
		rosette: null,
		saddle: null,
		tuningMachine: null,
		string: null
	}

  // constructor
  constructor(private http: HttpClient, private three: ThreeService, private loader: LoaderService) {
  	super();
  }

   // load data model
  public loadDataModel(bagianGitar, callback) {
  	// load data model
  	this.http.get(this.api + '/api/model/bagian/' + bagianGitar).subscribe((res) => {
  		callback(res);
  	});
  }

  // load data bahan
  public loadDataBahan(bagianGitar, callback) {
  	// load data bahan
  	this.http.get(this.api + '/api/harga-bahan/bagian/' + bagianGitar).subscribe((res) => {
  		callback(res);
  	});
  }

  // set info model
	public setInfoModel(bagianGitar, data) {
		this.info.gitar[bagianGitar].model = data;
		this.hitungTotalHarga();
	}

	// set info bahan
	public setInfoBahan(bagianGitar, data) {
    if (bagianGitar == 'top' || bagianGitar == 'sideDanBack' || bagianGitar == 'binding') {
    	this.info.gitar.body.bahan[bagianGitar] = data;
    }  else {
    	this.info.gitar[bagianGitar].bahan = data;
    }
    this.hitungTotalHarga();
	}

	// set orientasi
	public setOrientasi(orientasi) {
		this.info.orientasi = orientasi;
	}

	// set finishing
	public setFinishing(finishing) {
		this.info.finishing = finishing;
	}

	// set harga
	private hitungTotalHarga() {
		this.info.totalHarga = 0;
		for (let [key, value] of Object.entries(this.info.gitar)) {
      if (key == 'body') {
      	// cek jika data model null
      	if (this.info.gitar[key].model) {
      		this.info.totalHarga = this.info.totalHarga + parseInt(this.info.gitar[key].model.hargaModel);
      		console.log('body model');
      	}
      	// cek jika bahan top null
      	if (this.info.gitar[key].bahan.top) {
      		this.info.totalHarga = this.info.totalHarga + parseInt(this.info.gitar[key].bahan.top.hargaBahan);
      		console.log('body bahan top');
      	}
      	// cek jika bahan side dan back null
      	if (this.info.gitar[key].bahan.sideDanBack) {
      		this.info.totalHarga = this.info.totalHarga + parseInt(this.info.gitar[key].bahan.sideDanBack.hargaBahan);
      		console.log('body bahan side dan back');
      	}
      	// cek jika binding null
      	if (this.info.gitar[key].bahan.binding) {
      		this.info.totalHarga = this.info.totalHarga + parseInt(this.info.gitar[key].bahan.binding.hargaBahan);
      		console.log('body bahan binding');
      	}
      } else {
      	// cek jika data model null
	      if (this.info.gitar[key].model) {
	      	this.info.totalHarga = this.info.totalHarga + parseInt(this.info.gitar[key].model.hargaModel);
	      	console.log(this.info.gitar[key], 'model');
	      	// cek jika data bahan null
		      if (this.info.gitar[key].bahan) {
		      	this.info.totalHarga = this.info.totalHarga + parseInt(this.info.gitar[key].bahan.hargaBahan);
		      	console.log(this.info.gitar[key], 'bahan');
		      }
	      }
      }

    }
	}

	// get info
	public getInfo() {
		return this.info;
	}

	// public get data
  public getData() {
    return this.data;
  }

  // set model
	public setModel(bagianGitar) {
		// cek if data is null
		if (!this.info.gitar[bagianGitar].model) {
			// remove prev id
			this.three.removeObject(this.prevId[bagianGitar]);
			// set current id
			this.prevId[bagianGitar] = null;
			return false;
		}
		// load gltf model
		this.loader.loadGLTFModel(
			this.info.gitar[bagianGitar].model.idModel,
			this.info.gitar[bagianGitar].model.model3d,
			(obj) => {
				// remove previous model
				if (this.prevId[bagianGitar]) {
					this.three.removeObject(this.prevId[bagianGitar]);
				}
				// set new previous model
				this.prevId[bagianGitar] = this.info.gitar[bagianGitar].model.idModel;
				// set new scene model
				var scene = obj.scene;
				// set name scene
				scene.name = this.info.gitar[bagianGitar].model.idModel;
				// set bagian
				scene.userData.bagianGitar = bagianGitar;
				// set rotation
				scene.rotation.x = (90 * Math.PI) / 180;
        scene.rotation.y = (-90 * Math.PI) / 180;
        // traverse scene
        scene.traverse((node) => {
        	// cek node is mesh
        	if (node.isMesh) {
        		// cek nama bagian
	        	var name = node.name.toLowerCase();
	        	// set nama untuk setiap part
	        	if (name.includes('body-top')) {
	        		node.name = 'body-top';
	        		// add material
	        		node.material = this.material.body.top;
	        		// node.castShadow = true; //default is false
							// node.receiveShadow = false; //default
	        	} else if (name.includes('body-side')) {
							node.name = 'body-side';
	            // add material
	            node.material = this.material.body.sideDanBack;
						} else if (name.includes('body-back')) {
							node.name = 'body-back';
	            // add material
	            node.material = this.material.body.sideDanBack;
						} else if (name.includes('body-binding')) {
	            node.name = 'body-binding';
	            // add material
	            node.material = this.material.body.binding;
	          } else if (name.includes('bridge-pin')) {
							node.name = 'bridge-pin';
							// add material
							node.material = this.material.bridgePin;
						} else if (name.includes('bridge')) {
							node.name = 'bridge';
              // set default material
              node.material = this.material.bridge;
						} else if (name.includes('fingerboard')) {
							node.name = 'fingerboard';
              // add material
              node.material = this.material.fingerboard;
						} else if (name.includes('fret')) {
							node.name = 'fret';
              // set default material
              node.material = this.material.fret;
						} else if (name.includes('inlay')) {
							node.name = 'inlay';
              // set default material
              node.material = this.material.inlay;
						} else if (name.includes('logo')) {
							node.name = 'logo';
							// set default material
							node.material = this.material.logo;
						} else if (name.includes('neck-dan-headstock')) {
							node.name = 'neck-dan-headstock';
              // set default material
              node.material = this.material.neckDanHeadstock;
						} else if (name.includes('nut')) {
							node.name = 'nut';
              // set defult material
              node.material = this.material.nut;
						} else if (name.includes('pickguard')) {
							node.name = 'pickguard';
              // set default material
              node.material = this.material.pickguard;
						} else if (name.includes('rosette')) {
							node.name = 'rosette';
              // set default material
              node.material = this.material.rosette;
						} else if (name.includes('saddle')) {
							node.name = 'saddle';
              // set default material
              node.material = this.material.saddle;
						} else if (name.includes('tuning-machine')) {
							node.name = 'tuning-machine';
							// set default material
							node.material = this.material.tuningMachine;
						} else if (name.includes('string')) {
							node.name = 'string';
							// set default material
							node.material = this.material.string;
						}
        	}
        });

        // add scene to three object
        this.three.addObject(scene);

        // set prev texture
        // cek if body
        if (bagianGitar == 'body') {
        	// body top
        	if (this.texture.body.top) {
	        	this.material.body.top.map = this.texture.body.top
	        	this.material.body.top.needsUpdate = true;
	        }
	        // body side dan back
	        if (this.texture.body.sideDanBack) {
	        	this.material.body.sideDanBack.map = this.texture.body.sideDanBack
	        	this.material.body.sideDanBack.needsUpdate = true;
	        }
	        // body binding
	        if (this.texture.body.binding) {
	        	this.material.body.binding.map = this.texture.body.binding
	        	this.material.body.binding.needsUpdate = true;
	        }
        } else {
        	// cek texture
        	if (this.texture[bagianGitar]) {
	        	this.material[bagianGitar].map = this.texture[bagianGitar];
	        	this.material[bagianGitar].needsUpdate = true;
	        }
        }
			}
		);
	}

	// set bahan
	// bagian gitar bisa body top side back atau binding
	public setBahan(bagianGitar) {
		// url
		var url = null;
		// cek bagian adalah body
		if (bagianGitar == 'top' || bagianGitar == 'sideDanBack' || bagianGitar == 'binding') {
    	// body top
    	url = this.info.gitar.body.bahan[bagianGitar].gambarBahan;
    } else {
    	url = this.info.gitar[bagianGitar].bahan.gambarBahan;
    }

		// load image texture
		this.loader.loadImageTexture(url, (texture) => {
			// set temp texture
			if (bagianGitar == 'top' || bagianGitar == 'sideDanBack' || bagianGitar == 'binding') {
	    	// set temp texture
	    	this.texture.body[bagianGitar] = texture;
	    	// set texture
	    	this.material.body[bagianGitar].map = this.texture.body[bagianGitar];
	    	this.material.body[bagianGitar].color = new THREE.Color(0xc1c1c1);
	    	this.material.body[bagianGitar].needsUpdate = true;
	    } else {
	    	this.texture[bagianGitar] = texture;
	    	// set texture
	    	this.material[bagianGitar].map = this.texture[bagianGitar];
	    	this.material[bagianGitar].color = new THREE.Color(0xc1c1c1);
	    	this.material[bagianGitar].needsUpdate = true;
	    }
		});
	}

	// pesan
	public pesan(data) {
		// set data form
		return this.http.post(this.api + '/api/pesanan', data, {
    	headers: new HttpHeaders().set('Content-Type', 'application/json'),
  	});
	}
}
