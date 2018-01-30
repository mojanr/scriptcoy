import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {

  constructor(private router: Router) { }

  public setToken(token) {
  	localStorage.setItem('token', token);
  }

  public getToken() {
  	return localStorage.getItem('token') || '';
  }

  public cekToken() {
  	return !!localStorage.getItem('token');
  }

  public deleteToken() {
    localStorage.clear();
  }

  public setPengelola(data) {
    localStorage.setItem('pengelola', JSON.stringify(data));
  }

  public getPengelola() {
    return JSON.parse(localStorage.getItem('pengelola'));
  }

  public cekPengelola() {
    return !!localStorage.getItem('pengelola');
  }

  public authPengelola(menu) {
    if (this.cekPengelola()) {
      return this.getPengelola().tipe == menu;
    } else {
      return this.cekPengelola();
    }
  }

  public goToLogin() {
  	this.router.navigateByUrl('/login');
  }

  public goToMenu(bagian) {
  	switch (bagian) {
      case "Branding And Strategy":
        this.router.navigateByUrl('/menu-utama/model');
        break;
      case "Administrator":
        this.router.navigateByUrl('/menu-utama-administrator/pengelola');
        break;
      default:
        // code...
        this.router.navigateByUrl('/login');
        break;
    }
  }
}
