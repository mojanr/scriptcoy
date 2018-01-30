import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse,
  HttpErrorResponse,
  HttpInterceptor
} from '@angular/common/http';
import 'rxjs/add/operator/do';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './auth.service';

@Injectable()
export class HttpResponseService implements HttpInterceptor {

  constructor(private auth: AuthService) { }

  public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  	return next.handle(request).do((event: HttpEvent<any>) => {
  		if (event instanceof HttpResponse) {
  			// do with stuff
  			console.log('asdfasdf');
  		}
  	}, (err: any) => {
  		if (err instanceof HttpErrorResponse) {
  			console.log('http interceptor response error', err);
  			this.auth.goToLogin();
  			// if (err.status == 401) {
  			// 	console.log('error 401');
  			// 	// redirect to login
  			// 	this.auth.goToLogin();
  			// }
  		}
  	});
  }
}
