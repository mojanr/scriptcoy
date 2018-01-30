import { Injectable } from '@angular/core';
import ZipLoader from 'zip-loader';
declare var THREE: any;

@Injectable()
export class LoaderService {

  // image texture loader
	private textureLoader = new THREE.TextureLoader();
	// gltf loader
	private gltfLoader = new THREE.GLTFLoader();
	// gltf file cache
	private gltfCache = {};

	// constructor
  constructor() { }

  // image texture loader
  public loadImageTexture(url, callback) {
  	this.textureLoader.load(url, (texture) => {
  		callback(texture);
  	});
  }

  // load gltf model
	public loadGLTFModel(id, url, callback) {
		// check cache
		var cache = this.gltfCache[id];
		if (cache === undefined || cache === null) {
			// // cache id undifined, save baru
			this.zipLoader(id, url, (blob) => {
				// save as cache
				this.gltfCache[id] = blob;
				// load
				this.loadGLTF(id, blob , (obj) => {
					callback(obj);
				});
			});
		} else {
			console.log('cache');
			// cache is difined
			this.loadGLTF(id, cache, (obj) => {
				callback(obj);
			});
		}
	}

	// private zip loader 
	private zipLoader(id, url, callback) {
		var f = `${id}.glb`;
		var zl = new ZipLoader(url);
		zl.on('load', (e) => {
			var blob = zl.extractAsBlobUrl(f, 'model/gltf.binary');
			callback(blob);
		});
		zl.load();
	}

	// private load gltf file
	private loadGLTF(id, blob, callback) {
		this.gltfLoader.convertUpAxis = true;
		this.gltfLoader.load(blob, (obj) => {
			callback(obj);
		});
	}

}
