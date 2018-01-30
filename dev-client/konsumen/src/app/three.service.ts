import { Injectable } from '@angular/core';
declare var THREE: any;

@Injectable()
export class ThreeService {

	// atribute
	private scene = null;
	private camera = null;
	private renderer = null;
	private controls = null;

	// rayacasting
	private raycaster = new THREE.Raycaster();
	private mouseVector = new THREE.Vector2();

	// group scene object
	private groupScene = new THREE.Object3D;

	private img = new Image();

	// constructor
  constructor() { }

  // init three js
  // init scene
  public initScene() {
  	this.scene = new THREE.Scene();
  	this.scene.position.set(0, 0, 0);
  	this.scene.add(this.groupScene);
  }

  // init camera
  public initCamera(container) {
  	this.camera = new THREE.PerspectiveCamera(45, container.offsetWidth / container.offsetHeight, 1, 1000);
  	this.camera.position.set(0, 0, 20);
  	this.camera.lookAt(this.scene.position);
	}

	// init lightning
	public initLightning() {
		var light1 = new THREE.AmbientLight(0xFFFFFF, 0.3);
    this.scene.add( light1 );

    var hemiLight = new THREE.HemisphereLight( 0xffffff, 0xffffff, 0.6 );
		hemiLight.position.set( 0, 50, 0 );
		this.scene.add( hemiLight );

		var sl2 = new THREE.SpotLight(0xffffff, 2, 125, 1.5, 2);
		sl2.position.set(-50, 50, 48);
		sl2.position.multiplyScalar( 1 );
		this.scene.add( sl2 );

		var sl3 = new THREE.SpotLight(0xffffff, 2, 125, 1.5, 2);
		sl3.position.set(50, -50, -48);
		sl3.position.multiplyScalar( 1 );
		// sl3.castShadow = true;
		this.scene.add( sl3 );

		// this.scene.add(new THREE.AmbientLight(0x999999));
	}

	// init helper
	public initHelper() {
		// axis and grid helper
		// axis helper
		var axis = new THREE.AxisHelper(50);
		axis.position.set(0, 0, 0);
		this.scene.add(axis);
		// grid helper
		var grid = new THREE.GridHelper(25, 25);
		grid.position.set(0, 0, 0);
		this.scene.add(grid);
	}

	// init renderer
	public initRenderer(container) {
		this.renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
		this.renderer.setPixelRatio(container.devicePixelRatio);
		this.renderer.setSize(container.offsetWidth, container.offsetHeight);
    this.renderer.setClearColor(0xcccccc);
		this.renderer.autoClear = false;
		this.renderer.gammaInput = true;
		this.renderer.gammaOutput = true;
		container.appendChild(this.renderer.domElement);
	}

	// init controls
	public initControls() {
		this.controls = new THREE.TrackballControls(this.camera, this.renderer.domElement);
		// this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
		this.controls.rotateSpeed = 1;
		this.controls.zoomSpeed = 1.2;
		this.controls.panSpeed = 0.1;
		this.controls.staticMoving = false;
		this.controls.minDistance = 5;
		this.controls.maxDistance = 20;
		this.controls.enableDamping = true;
		this.controls.dampingFactor = 0.2;
		this.controls.dynamicDampingFactor = 0.2;
	}

	// run three js
	// run
	public run() {
		this.animate();
	}

	// update three scene
  private update() {
  	this.controls.update();
  	// TWEEN.update();
  }

  // render three scene
  private render() {
  	this.renderer.render(this.scene, this.camera);
  }

  // animate three scene
	private animate() {
		window.requestAnimationFrame(() => this.animate());
		this.update();
    this.render();
	}

	// resize event
	public resize(container) {
		this.camera.aspect = container.offsetWidth / container.offsetHeight;
		this.camera.updateProjectionMatrix();
		this.renderer.setSize(container.offsetWidth, container.offsetHeight);
		this.controls.handleResize();
	}

	// get scene
	public getScene() {
		return this.scene;
	}

	// get camera
	public getCamera() {
		return this.camera;
	}

	// get renderer
	public getRenderer() {
		return this.renderer;
	}

	// get controls
	public getControls() {
		return this.controls;
	}

	// get group scene
	public getGroupScene() {
		return this.groupScene;
	}

	// add object
	public addObject(object) {
		this.groupScene.add(object);
	}

	// remove object
	public removeObject(id) {
		this.groupScene.remove(this.groupScene.getObjectByName(id));
	}

	// focus
	// animate camera ke posisi yang ditentukan
	// public focus(pos, target) {
	// 	// // fix posisi
	// 	// this.resetView();
	// 	this.scene.position.y = -4;
	// 	this.camera.position.set(0, -30, 50);
	// 	this.camera.up.set(1, 0, 0);
	// 	this.controls.target.set(0, 0, 0);
	// }

	public focus(target) {
		this.scene.position.y = -4;
		this.scene.rotation.z = 0;
		switch (target) {
			case "body":
				this.camera.position.set(-3.5, -13, 13);
				this.controls.target.set(-4.5, 1, 0);
				break;
			case "pickguard":
			case "bridge":
			case "rosette":
				this.camera.position.set(-3.5, -7, 15);
				this.controls.target.set(-4.5, -0.5, 0);
				break;
			case "inlay":
			case "fingerboard":
			case "string":
				this.camera.position.set(1.9, -5, 10);
				this.controls.target.set(1.9, -1, 0);
				break;
			case "tuningMachine":
			case "neckDanHeadstock":
				this.camera.position.set(5.8, -10, 10);
				this.controls.target.set(5.5, 0, 0);
				break;
			case "logo":
				this.camera.position.set(5.8, -5, 10);
				this.controls.target.set(5.5, -1.6, 0);
				break;
			default:
				this.camera.position.set(0, 0, 20);
				this.controls.target.set(0, 0, 0);
				this.scene.scale.x = 1;
				break;
		}
		this.camera.up.set(1, 0, 0);
		//this.camera.updateProjectionMatrix();
	}

	// set view
	public setView(view) {
		// this.resetView();
		// if (this.scene.scale.y == -1) {
		// 	this.scene.scale.y = 1;
		// 	this.scene.scale.x = -1;
		// } else {
		// 	this.scene.scale.y = -1;
		// 	this.scene.scale.x = 1;
		// }
		switch (view) {
			case "front":
				this.camera.position.set(0, 0, 20);
				if(window.innerWidth / window.innerHeight >= 1){
					this.camera.up.set(0, 1, 0);
				} else {
					this.camera.up.set(1, 0, 0);
				}
				break;
			case "back":
				this.camera.position.set(0, 0, -20);
				if(window.innerWidth / window.innerHeight >= 1){
					this.camera.up.set(0, 1, 0);
				} else {
					this.camera.up.set(1, 0, 0);
				}
				break;
			case "side":
				this.camera.position.set(0, 20, 6);
				if(window.innerWidth / window.innerHeight >= 1){
					this.camera.up.set(0, 0, 1);
				} else {
					this.camera.up.set(1, 0, 0);
				}
				break;
		}
		this.controls.target.set(0, 0, 0);
	}

	public resetView() {
		// this.scene.rotation.z = 0;
		// this.camera.rotation.set(0, 0, 0);
		// this.camera.position.set(0, 0, 20);
  // 	this.camera.lookAt(this.scene.position);
  // 	this.controls.reset();
  	this.scene.position.y = 0;
  	this.scene.rotation.z = 0;
 		this.camera.up.set(0, 0, 1);
 		this.camera.position.set(0, 0, 20);
 		this.camera.lookAt(this.scene.position);
 		this.controls.reset();
 		this.camera.updateProjectionMatrix();
 		// reset
 		this.scene.scale.x = 1;
 		console.log(this.scene.scale.y);
 	// 	// set orientation
 		if (this.scene.scale.y == 1) {
 			this.scene.position.x = 0;
 			this.scene.rotation.z = 0;
		} else {
			// this.scene.scale.x = 1;
			this.scene.rotation.z = (180 * Math.PI) / 180;
		}
	}

	// get object onclick
	public getObjectOnClick(event, callback) {
		// get position
		this.mouseVector.x = (event.offsetX / this.renderer.domElement.clientWidth) * 2 - 1;
		this.mouseVector.y = -1 * (event.offsetY / this.renderer.domElement.clientHeight) * 2 + 1;
		// console.log(this.mouseVector);
		// console.log(this.scene);
		// set raycaster
		this.raycaster.setFromCamera(this.mouseVector, this.camera);
		// console.log(this.raycaster);
		var intersects = this.raycaster.intersectObjects(this.groupScene.children, true);
		if (intersects.length > 0) {
			console.log('ada', intersects[0].object.parent.userData.bagianGitar);
			// if (this.intersected != intersects[0].object.parent) {
			// 	this.intersected = intersects[0].object;
			// 	console.log(this.intersected.name, this.intersected);
			// 	// $('.infoClickedObject').text(INTERSECTED.name);
				callback(intersects[0].object.parent.userData.bagianGitar);
			// }
		}
	}
	
	// snapshot
	public snapshot(view) {
		var img = new Image();
		this.renderer.render(this.scene, this.camera);
    img.src = this.renderer.domElement.toDataURL("image/jpg");
    return img;
	}

	public flip(value) {
		if (value == 'right handed') {
			this.scene.scale.y = 1;
		} else {
			this.scene.scale.y = -1;
		}
	}
}
