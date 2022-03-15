import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { login } from 'src/app/Models/Login/login';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  baseUrl = "https://localhost:7017/api/";
  constructor(private http: HttpClient) { }

  loginUser(input: login, type: number): Observable<any> {
    switch (type) {
      case 1: {
        return this.http.post(this.baseUrl + "Account/LoginAdmin", input).pipe();
      }
      case 2: {
        return this.http.post(this.baseUrl + "Sick/LoginSick", input).pipe();
      }
      case 3: {
        return this.http.post(this.baseUrl + "Doctor/LoginDoctor", input).pipe();
      }
      case 4: {
        return this.http.post(this.baseUrl + "Nurse/LoginNurse", input).pipe();
      }
      default: {
        return this.http.post(this.baseUrl + "Hospital/LoginHospital", input).pipe();
      }
    }
  }

}
