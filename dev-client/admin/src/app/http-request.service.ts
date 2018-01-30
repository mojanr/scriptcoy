import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable()
export class HttpRequestService implements HttpInterceptor {

  constructor(private auth: AuthService) { }

  public intercept(request: HttpRequest<any>, next: HttpHandler) {

  	request = request.clone({
  		setHeaders: {
  			Authorization: `Bearer ${this.auth.getToken()}`
  		}
  	});

  	return next.handle(request);
  }
}
