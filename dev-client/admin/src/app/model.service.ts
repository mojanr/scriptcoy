import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Api } from './api';

@Injectable()
export class ModelService extends Api {

	constructor(private http: HttpClient) {
		super();
	}

	// tambah data
	public tambahData(data) {
		return this.http.post(this.api + '/api/model/tambah', data);
	} 
	
	// ubah data
	public ubahData(data) {
		return this.http.post(this.api + '/api/model/ubah', data);
	}

	// hapus data
	public hapusData(idModel) {
		return this.http.delete(this.api + '/api/model/' + idModel);
	}

	// cari data
	public cariData(data) {
		return this.http.get(this.api + '/api/model/cari/' + data);
	}

	// load data
	public loadData() {
		return this.http.get(this.api + '/api/model');
	}

	// load data by id
	public loadDataById(idModel) {
		return this.http.get(this.api + '/api/model/' + idModel);
	}

	// load data by bagian
	public loadDataByBagian(bagianGitar) {
		return this.http.get(this.api + '/api/model/bagian/' + bagianGitar);
	}

	// get new id
	public getNewId() {
		return this.http.get(this.api + '/api/model/new/id');
	}

}
