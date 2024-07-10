import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthFacadeService } from '../../../façade/auth-facade.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { UserFacadeService } from '../../../façade/user-facade.service';
import { RegisterRequest } from '../../../models/request/register-request.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, HttpClientModule],
  providers: [AuthFacadeService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  token?: string;
  showErrorMessage: boolean = false;

  isSignUp: boolean = false;

  loginForm = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, Validators.required),
  });

  signUpForm = new FormGroup({
    name: new FormControl(null, Validators.required),
    surname: new FormControl(null, Validators.required),
    phoneNumber: new FormControl(null, Validators.required),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{1,8}')]),
    routes: new FormControl([]),
    paymentMethods: new FormControl([]),
    role: new FormControl('user'),
  });

  constructor(private authFacadeService: AuthFacadeService, private userFacade: UserFacadeService) {}

  ngOnInit() {}

  onLogin() {
    if (this.loginForm.invalid) {
      return;
    }

    const email = this.loginForm.get('email')?.value;
    const password = this.loginForm.get('password')?.value;

    if (typeof email === 'string' && typeof password === 'string') {
      this.authFacadeService.onLogin(email, password);
    } else {
      console.error('Email or password is not a string.');
    }
  }

  changeIsSignUp() {
    this.isSignUp = !this.isSignUp;
  }

  onSignUp() {
    if (this.loginForm.invalid) {
      return;
    }
    this.userFacade.registerUser(<RegisterRequest><unknown>this.signUpForm.value);
    this.changeIsSignUp();
  }

}
