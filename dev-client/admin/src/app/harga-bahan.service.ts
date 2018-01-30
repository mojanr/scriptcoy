import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Api } from './api';

@Injectable()
export class HargaBahanService extends Api {

	constructor(private http: HttpClient) {
		super();
	}

	// tambah data
	public tambahData(data) {
		return this.http.post(this.api + '/api/harga-bahan', data);
	} 
	
	// ubah data
	public ubahData(data) {
		return this.http.put(this.api + '/api/harga-bahan', data);
	}

	// hapus data
	public hapusData(idHargaBahan) {
		return this.http.delete(this.api + '/api/harga-bahan/' + idHargaBahan);
	}

	// cari data
	public cariData(data) {
		return this.http.get(this.api + '/api/harga-bahan/cari/' + data);
	}

	// load data
	public loadData() {
		return this.http.get(this.api + '/api/harga-bahan');
	}

	// load data by id
	public loadDataById(idHargaBahan) {
		return this.http.get(this.api + '/api/harga-bahan/' + idHargaBahan);
	}

	// load data by bagian
	public loadDataByBagian(bagianGitar) {
		return this.http.get(this.api + '/api/harga-bahan/bagian/' + bagianGitar);
	}

	// get new id
	public getNewId() {
		return this.http.get(this.api + '/api/harga-bahan/new/id');
	}

}
