import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
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

  constructor(private formBuilder: FormBuilder, private router: Router, private loginService: LoginServiceService,
    private snackBar: MatSnackBar) {
    this.loginData = new login();
  }

  ngOnInit(): void {
  }

  selectOption(id: any) {
    this.typeAccount = id;
  }

  onSubmit(event: any) {
    this.typeAccount = parseInt(event.target.selectType.value);
    console.log(this.typeAccount);
    this.loginData.username = event.target.userNameOrEmailInput.value;
    this.loginData.email = event.target.userNameOrEmailInput.value;
    this.loginData.password = event.target.passwordInput.value;

    this.loginService.loginUser(this.loginData, this.typeAccount).subscribe(data => {
      localStorage.setItem('username', data.data.userName);
      localStorage.setItem('token', data.data.token);

      if (this.typeAccount == 1) {
        localStorage.setItem('userType', "Admin");
      }
      else if (this.typeAccount == 2) {
        localStorage.setItem('userType', "Sick");
      }
      else if (this.typeAccount == 3) {
        localStorage.setItem('userType', "Doctor");
      }
      else if (this.typeAccount == 4) {
        localStorage.setItem('userType', "Nurse");
      }
      else if (this.typeAccount == 5) {
        localStorage.setItem('userType', "Hospital");
      }
      
      if (this.typeAccount > 2)
        localStorage.setItem('id', data.data.id);
      this.snackBar.open(data.message, 'close', {
        duration: 3000,
        horizontalPosition: 'start',
        verticalPosition: 'bottom',
      });
      this.router.navigateByUrl("/");
    }, err => {
      this.snackBar.open(err, 'close', {
        duration: 3000,
        horizontalPosition: 'start',
        verticalPosition: 'bottom',
      });
    });
  }

  toggleShow() {
    this.showPassword = !this.showPassword;
  }

}
