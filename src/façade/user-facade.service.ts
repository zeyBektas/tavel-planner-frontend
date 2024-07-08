import { Injectable } from '@angular/core';
import { UsersApiService } from '../api/users-api.service';
import { RegisterRequest } from '../models/request/register-request.model';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserFacadeService {

  private registerSubscription!: Subscription;

  constructor(private userApi: UsersApiService) { }

  async registerUser(user: RegisterRequest) {
    this.registerSubscription = (await this.userApi.registerUser(user)).subscribe({
      next:(response: any) => {
        console.log('register response');
        console.log(response);

      },error: (error) => {
        console.log(error);
      }, complete: () => {
        this.registerSubscription.unsubscribe();
      }
    })
  }
}
