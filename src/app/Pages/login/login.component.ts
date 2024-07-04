import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthFacadeService } from '../../../façade/auth-facade.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  token?: string;
  showErrorMessage: boolean = false;

  isSignUp: boolean = false;

  loginForm = new FormGroup({
    username: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, Validators.required),
  });

  signUpForm = new FormGroup({
    name: new FormControl(null, Validators.required),
    lastName: new FormControl(null, Validators.required),
    phoneNumber: new FormControl(null, Validators.required),
    username: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, Validators.required),
  })

  constructor(private authFacadeService: AuthFacadeService) {}

  ngOnInit() {
    
  }

  onLogin() { 
    if (this.loginForm.invalid) {
      return;
    }
    console.log('denemee');
    
    this.authFacadeService.onLogin();
    // this.authFacadeService.error404Event.subscribe(() => {
    //   this.showErrorMessage = true;
    // });
    
    // this.showErrorMessage = false;
    // await this.authFacadeService.onLogin(this.form.get('username')?.value, this.form.get('password')?.value);
  }

  changeIsSignUp() {
    this.isSignUp = !this.isSignUp;
  }

  onSignUp() {
    if (this.loginForm.invalid) {
      return;
    }
    console.log('deneme sign up');
    this.changeIsSignUp()
  }

}
