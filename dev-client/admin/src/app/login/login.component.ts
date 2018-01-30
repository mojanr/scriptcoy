import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { MessageService } from '../message.service';
import { AuthService } from '../auth.service';
declare var $:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

	// atribute
	public errorMessage = '';

  constructor(private loginService: LoginService, private notif: MessageService, private auth: AuthService) {
    if (this.auth.cekPengelola()) {
      this.auth.goToMenu(this.auth.getPengelola().tipe);
    }
  }

  ngOnInit() {
  	// init form
    $("#login-form").form({
      on: "blur",
      fields: {
        username: "empty",
        password: "empty"
      }
    });
  }

  // login
  public login() {
  	// add class hidden
  	$('#message').addClass('hidden');
  	// cek login form valid atau tidak
  	if ($('#login-form').form('is valid')) {
  		// form valid
  		console.log('valid');
  		// addclass loading
			$('#button-login').addClass('loading');
  		// get value dari form
  		var value = $('#login-form').form('get values');
      console.log(this.auth.getToken());
  		// console.log(value);
  		// send data
  		this.loginService.login(value).subscribe((res) => {
  			// cek response status
  			if (res['status']) {
  				// success
  				console.log('succes', res['message']);
          // notif
          // this.notif.notif(false, res['status'], res['message']);
  				// set cookies
          this.auth.setToken(res['message'][0]['token']);
          // set petugas
          this.auth.setPengelola(res['message'][0]);
          // cek bagian petugas
          this.auth.goToMenu(res['message'][0]['tipe']);
          
          this.notif.notif(false, null, null);

  				// remove class loading
  				$('#button-login').removeClass('loading');
  				// redirect
  			} else {
  				// error
  				console.log('error', res['message']);
  				// set message
  				// this.errorMessage = res['message'];
          this.notif.notif(true, res['status'], res['message']);
  				// remove class hidden
  				// $('#message').removeClass('hidden');
  				// remove class loading
  				$('#button-login').removeClass('loading');
  			}
  		});
  	} else {
  		// form tidak valid
  		console.log('tidak valid');
  		// set message
  		// this.errorMessage = 'Field tidak boleh kosong!';
      this.notif.notif(true, false, 'Field tidak boleh kosong!');
			// remove class hidden
			// $('#message').removeClass('hidden');
			// remove class loading
			$('#button-login').removeClass('loading');
  	}
  }
}
