import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { HttpParams } from '@angular/common/http';
import { RegisterRequest } from '../models/request/register-request.model';

@Injectable({
  providedIn: 'root'
})
export class UsersApiService {

  constructor(private api: ApiService) { }

  getUser(userId: any) {
    let params = new HttpParams();
    if(userId) {
      params = params.set('id', userId);
    }

    return this.api.get(`users`, params);
  }

  registerUser(user: RegisterRequest) {
    return this.api.post(`user/register`, user);
  }
}
