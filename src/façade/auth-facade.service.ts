import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthApiService } from '../api/auth-api.service';
import { BehaviorSubject, Subscription } from 'rxjs';
import { LoginRequest } from '../models/request/login-request.model';
import { LoginResponse } from '../models/response/login-response.model';

@Injectable({
  providedIn: 'root'
})
export class AuthFacadeService {

  private onLoginSubscription!: Subscription;
  private _isLoggedIn$ = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this._isLoggedIn$.asObservable();

  constructor(private authApi: AuthApiService, private router: Router) { }

  async onLogin(email: string, password: string) {

    this.onLoginSubscription = (await (this.authApi.login(<LoginRequest>{ email: email, password: password }))).subscribe({
      next: (loginResponse: any) => {
        console.log('responseee');
        console.log(loginResponse);
        this._isLoggedIn$.next(true);
        localStorage.setItem('userId', loginResponse.id);
        // localStorage.setItem('accessToken', loginResponse.accessToken);        
        // localStorage.setItem('refreshToken', loginResponse.refreshToken);
        this.router.navigateByUrl('/');
        console.log('onFacade');
        console.log(loginResponse);
      },error: (error) => {
        console.log(error);
      }, complete: () => {
        this.onLoginSubscription?.unsubscribe();
      }
    })
  }

  get accessToken(): any {
    return localStorage.getItem('accessToken');
  }

  get refreshToken(): any {
    return localStorage.getItem('refreshToken');
  }
}
