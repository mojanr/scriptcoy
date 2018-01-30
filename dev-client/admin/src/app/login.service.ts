import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Api } from './api';

@Injectable()
export class LoginService extends Api {

	constructor(private http: HttpClient, private router: Router) {
		super();
	}

	// login
	public login(data) {
		return this.http.post(this.api + '/login', data);
	}

	// logout
	public logout() {
		// redirect to login
		this.router.navigateByUrl('/login');
	}
	
}
