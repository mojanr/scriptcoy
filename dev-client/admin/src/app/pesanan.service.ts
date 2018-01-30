import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Api } from './api';

@Injectable()
export class PesananService extends Api {

  constructor(private http: HttpClient) {
		super();
	}

	// tambah data
	public tambahData(data) {
		return this.http.post(this.api + '/api/pesanan/tambah', data);
	} 
	
	// ubah status
	public ubahStatus(idPesanan, data) {
		return this.http.put(this.api + '/api/pesanan/' + idPesanan, data);
	}

	// hapus data
	public hapusData(idPesanan) {
		return this.http.delete(this.api + '/api/pesanan/' + idPesanan);
	}

	// cari data
	public cariData(data) {
		return this.http.get(this.api + '/api/pesanan/cari/' + data);
	}

	// load data
	public loadData() {
		return this.http.get(this.api + '/api/pesanan');
	}

	// load data by id
	public loadDataById(idPesanan) {
		return this.http.get(this.api + '/api/pesanan/' + idPesanan);
	}

	// get new id
	public getNewId() {
		return this.http.get(this.api + '/api/pesanan/new/id');
	}

}
