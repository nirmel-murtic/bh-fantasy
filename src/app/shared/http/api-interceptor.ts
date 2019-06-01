import {HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from '@angular/common/http';

import {environment} from '../../../environments/environment';

import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const baseUrl = environment.apiUrl;

    const token = localStorage.token;

    const apiReq = req.clone({
      url: `${baseUrl}${req.url}`,
      headers: new HttpHeaders(token ? {
        'Authorization': 'Bearer ' + token
      } : {})
    });

    return next.handle(apiReq);
  }
}
