import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { login } from '../Models/Login/login';
import { DoctorService } from '../Services/doctor/doctor.service';
import { HospitalService } from '../Services/hospital/hospital.service';
import { LoginServiceService } from '../Services/login/login-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  showPassword = false;
  loginData: login;
  returnUrl:string='/';
  loginForm = this.formBuilder.group({
    userNameOrEmailInput: ['', Validators.required],
    passwordInput: ['', Validators.required]
  });

  constructor(private formBuilder: FormBuilder,private activRoute:ActivatedRoute, private router: Router, private loginService: LoginServiceService,
    private snackBar: MatSnackBar,private doctorService:DoctorService,
    private hospitalService:HospitalService) {
    this.loginData = new login();
  }

  ngOnInit(): void {
    this.returnUrl=this.activRoute.snapshot.queryParams['returnUrl']||'/';
  }



  onSubmit(event: any) {
    this.loginData.userNameOrEmail = event.target.userNameOrEmailInput.value;
    this.loginData.password = event.target.passwordInput.value;

    this.loginService.loginUser(this.loginData).subscribe(data => {
      localStorage.setItem('username', data.data.userName);
      localStorage.setItem('token', data.data.token);
      localStorage.setItem('userType', data.data.userType);

      this.doctorService.setValue(data.data.userName)
      this.hospitalService.setValue(data.data.userName)
      this.snackBar.open(data.message, 'close', {
        duration: 3000,
        horizontalPosition: 'start',
        verticalPosition: 'bottom',
      });
      this.router.navigateByUrl(this.returnUrl);
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
