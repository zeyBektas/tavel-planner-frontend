import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthStateService {
  
  isLoggedIn$ = new BehaviorSubject(false);
  private login$ = new BehaviorSubject<any>(null);

  constructor() { }

  setIsLoggedIn(loginResponse: any) {
    this.login$.next(loginResponse);
    this.isLoggedIn$.next(true);
  }

  getLogin$() {
    return this.login$.asObservable();
  }
}
