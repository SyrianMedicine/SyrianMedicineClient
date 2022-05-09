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

  loginUser(input: login): Observable<any> {
        return this.http.post(this.baseUrl + "Account/Login", input).pipe(catchError(this.errorHandler));
  }
}
