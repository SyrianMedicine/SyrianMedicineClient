import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReserveHospitalService {

  baseUrl = "https://localhost:7017/api/Sick/";

  constructor(private http: HttpClient) { }

  async reserveHospital(body: any): Promise<Observable<any>> {
    var headersObject = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem('token'));
    const httpOptions = {
      headers: headersObject
    };
    return this.http.post(this.baseUrl + "ReserveBedInHospital", body, httpOptions).pipe(catchError(this.errorHandler));
  }
  errorHandler(error: HttpErrorResponse) {
    return throwError(error.error.message);
  }
}
