import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReserveDoctorOrNurseService {

  baseUrl = "https://localhost:7017/api/Sick/";

  constructor(private http: HttpClient) { }

  async ReserveDate(data: any, type: number): Promise<Observable<any>> {
    var headersObject = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem('token'));
    const httpOptions = {
      headers: headersObject
    };
    if (type == 1)
      return await this.http.post(this.baseUrl + "ReserveDateWithDoctor", data, httpOptions).pipe(catchError(this.errorHandler));
    else
      return await this.http.post(this.baseUrl + "ReserveDateWithNurse", data, httpOptions).pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(error.error.message);
  }
}
