import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { login } from '../Models/Login/login';
import { LoginServiceService } from '../Services/login/login-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  typeAccount = 1;
  showPassword = false;
  loginData: login;
  loginForm = this.formBuilder.group({
    userNameOrEmailInput: ['', Validators.required],
    passwordInput: ['', Validators.required]
  });

  constructor(private formBuilder: FormBuilder, private router: Router, private loginService: LoginServiceService) {
    this.loginData = new login();
  }

  ngOnInit(): void {
  }

  selectOption(id: any) {
    this.typeAccount = id;
  }

  onSubmit(event: any) {

    this.loginData.username = event.target.userNameOrEmailInput.value;
    this.loginData.email = event.target.userNameOrEmailInput.value;
    this.loginData.password = event.target.passwordInput.value;

    this.loginService.loginUser(this.loginData, this.typeAccount).subscribe(data => {
      localStorage.setItem('username', data.data.userName);
      localStorage.setItem('token', data.data.token);
      if (this.typeAccount > 2)
        localStorage.setItem('id', data.data.id);
      this.router.navigateByUrl("/");
    }, err => {
      console.log(err);
    });
  }

  toggleShow() {
    this.showPassword = !this.showPassword;
  }

}
