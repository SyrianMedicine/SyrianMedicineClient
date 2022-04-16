import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, Observable, throwError } from 'rxjs';
import { login } from 'src/app/Models/Login/login';
import { loginAdminOutput } from 'src/app/Models/Login/LoginAdminOutput';
import { BaseServices } from '../Common/BaseService.service';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService extends BaseServices {
  baseUrl = this.HostUrl+"/";
 
  constructor(private http: HttpClient, private snackBar: MatSnackBar) {super(); }

  loginUser(input: login, type: number): Observable<any> {
    switch (type) {
      case 1: {
        return this.http.post(this.baseUrl + "Account/LoginAdmin", input).pipe(catchError(this.errorHandler));
      }
      case 2: {
        return this.http.post(this.baseUrl + "Sick/LoginSick", input).pipe(catchError(this.errorHandler));
      }
      case 3: {
        return this.http.post(this.baseUrl + "Doctor/LoginDoctor", input).pipe(catchError(this.errorHandler));
      }
      case 4: {
        return this.http.post(this.baseUrl + "Nurse/LoginNurse", input).pipe(catchError(this.errorHandler));
      }
      default: {
        return this.http.post(this.baseUrl + "Hospital/LoginHospital", input).pipe(catchError(this.errorHandler));
      }
    }
  }
}
