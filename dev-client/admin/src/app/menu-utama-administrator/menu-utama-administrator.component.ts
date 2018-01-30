import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-menu-utama-administrator',
  templateUrl: './menu-utama-administrator.component.html',
  styleUrls: ['./menu-utama-administrator.component.css']
})
export class MenuUtamaAdministratorComponent implements OnInit {

  constructor(private auth: AuthService) {
    // cek menu
    if (!this.auth.authPengelola('Administrator')) {
      console.log('administrator');
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
