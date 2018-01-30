import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Api } from './api';

@Injectable()
export class BahanService extends Api {

	constructor(private http: HttpClient) {
		super();
	}

	// tambah data
	public tambahData(data) {
		return this.http.post(this.api + '/api/bahan/tambah', data);
	} 
	
	// ubah data
	public ubahData(data) {
		return this.http.post(this.api + '/api/bahan/ubah', data);
	}

	// hapus data
	public hapusData(idBahan) {
		return this.http.delete(this.api + '/api/bahan/' + idBahan);
	}

	// cari data
	public cariData(data) {
		return this.http.get(this.api + '/api/bahan/cari/' + data);
	}

	// load data
	public loadData() {
		return this.http.get(this.api + '/api/bahan');
	}

	// load data by id
	public loadDataById(idBahan) {
		return this.http.get(this.api + '/api/bahan/' + idBahan);
	}

	// get new id
	public getNewId() {
		return this.http.get(this.api + '/api/bahan/new/id');
	}
	
}
