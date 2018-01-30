import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-menu-utama',
  templateUrl: './menu-utama.component.html',
  styleUrls: ['./menu-utama.component.css']
})
export class MenuUtamaComponent implements OnInit {

  constructor(private auth: AuthService) {
    // cek menu
    if (!this.auth.authPengelola('Branding And Strategy')) {
      this.auth.goToLogin();
    }
  }

  ngOnInit() {
  }

  public logout() {
  	this.auth.deleteToken();
  	this.auth.goToLogin();
  }
}
