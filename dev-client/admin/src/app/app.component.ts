import { Component, OnInit } from '@angular/core';
import { MessageService } from './message.service';
declare var $:any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  // message
  public show;
  public status;
  public message;
  private timeout;

  constructor(private notif: MessageService) { }

  ngOnInit() {
  	this.notif.alert.subscribe((message) => {
			if (message.show) {
				// clear timout
				clearTimeout(this.timeout);

				// remove element pertama
				if (!!$("#notif .item").first()) {
					$("#notif .item").first().remove();
				}

				// cek status untuk message tmp
				if (message.status) {
					// success message
					this.message = '<div class="item"><div class="ui icon small success message"> <i class="close icon"></i> <i class="checkmark icon"></i><div class="content"><div class="header"> success </div><p> '+ message.message +' </p></div></div></div>';
				} else {
					// error message
					this.message = '<div class="item"><div class="ui icon small error message"> <i class="close icon"></i> <i class="warning sign icon"></i><div class="content"><div class="header"> Error </div><p> '+ message.message +' </p></div></div></div>';
				}

				// add message ke list
				$("#notif").append(this.message);
				// hide element lalau transition fade up
				$("#notif .item").first().transition("hide").transition("fade up", "500ms");
			
				// cek status jika true fade out selang waktu 2500 ms
				if (message.status) {
					this.timeout = setTimeout(function() {
						$("#notif .item").first().transition("fade up", "500ms");
						var t = setTimeout(function() {
							$("#notif .item").first().remove();
						}, 550);
					}, 2500);
				}
			} else {
				this.removeNotif();
			}
  	});

  	$(document).on("click", "#notif .item .ui.message", () => {
			this.removeNotif();
		});
  }

  private removeNotif() {
  	$("#notif .item").first().transition("fade up", "500ms");
		var t = setTimeout(() => {
			$("#notif .item").first().remove();
		}, 550);
  }
}
