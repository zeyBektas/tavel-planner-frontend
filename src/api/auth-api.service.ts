import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { LoginRequest } from '../models/request/login-request.model';

@Injectable({
  providedIn: 'root'
})
export class AuthApiService {


  constructor(private api: ApiService) { }

  login(data: LoginRequest) {
    console.log('in api send post');
    console.log(data);
    return this.api.post(`user/login`, data);
  }
}
