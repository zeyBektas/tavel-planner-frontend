import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthFacadeService } from '../../façade/auth-facade.service'; 

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authFacadeService: AuthFacadeService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if(!request.url.includes('auth/login')){

      request = request.clone({
        headers: request.headers.set('authorization', 'Bearer ' + this.authFacadeService.accessToken)
      });
    }
    return next.handle(request);
  }
}

export const AuthInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: AuthInterceptor,
  multi: true,
};