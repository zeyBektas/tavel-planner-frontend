import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthFacadeService {

  constructor(private router: Router) { }

  onLogin() {

    console.log('aaaaa')
    this.router.navigateByUrl('/');
  }
}
