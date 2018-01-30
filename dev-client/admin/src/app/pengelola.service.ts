import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Api } from './api';

@Injectable()
export class PengelolaService extends Api {

  constructor(private http: HttpClient) {
  	super();
  }

  // tambah data
	public tambahData(data) {
		return this.http.post(this.api + '/api/pengelola/tambah', data);
	} 
	
	// ubah data
	public ubahData(data) {
		return this.http.post(this.api + '/api/pengelola/ubah', data);
	}

	// hapus data
	public hapusData(username) {
		return this.http.delete(this.api + '/api/pengelola/' + username);
	}

	// cari data
	public cariData(data) {
		return this.http.get(this.api + '/api/pengelola/cari/' + data);
	}

	// load data
	public loadData() {
		return this.http.get(this.api + '/api/pengelola');
	}

	// load data by id
	public loadDataById(username) {
		return this.http.get(this.api + '/api/pengelola/' + username);
	}

	// // get new id
	// public getNewId() {
	// 	return this.http.get(this.api + '/api/pengelola/new/id');
	// }

}
