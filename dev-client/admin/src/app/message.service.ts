import { Injectable } from '@angular/core';
import { Subject }  from 'rxjs/Subject';

export class AlertMessage {
	public show: boolean;
	public status: boolean;
	public message: string;
}

@Injectable()
export class MessageService {

	// observable
	public alert = new Subject<AlertMessage>();

  constructor() { }

  // show true, false
  // status error = false, success = true
  public notif(show, status, message) {
  	var notifMessage = { show: show, status: status, message: message };
  	this.alert.next(notifMessage);
  }

}
