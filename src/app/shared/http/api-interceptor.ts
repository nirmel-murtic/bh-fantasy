import {
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
  HttpXsrfTokenExtractor
} from '@angular/common/http';

import {environment} from '../../../environments/environment';

import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {

  constructor(private tokenExtractor: HttpXsrfTokenExtractor) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let csrfToken = this.tokenExtractor.getToken() as string;

    const baseUrl = environment.apiUrl;

    const token = localStorage.token;

    const headers = {};

    if(token) {
      headers['Authorization'] = 'Bearer ' + token;
    }

    if(csrfToken) {
      headers['X-XSRF-TOKEN'] = csrfToken;
    }

    const apiReq = req.clone({
      url: `${baseUrl}${req.url}`,
      headers: new HttpHeaders(headers)
    });

    return next.handle(apiReq);
  }
}
