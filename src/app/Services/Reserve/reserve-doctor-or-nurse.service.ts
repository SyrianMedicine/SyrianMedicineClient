import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { ReserveDoctorOrNurse } from 'src/app/Models/Reserve/ReserveDoctorOrNurse/ReserveDoctorOrNurse';

@Injectable({
  providedIn: 'root'
})
export class ReserveDoctorOrNurseService {

  baseUrl = "https://localhost:7017/api/Sick/";

  constructor(private http: HttpClient) { }

  async ReserveDate(data: ReserveDoctorOrNurse): Promise<Observable<any>> {
    var headersObject = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem('token'));
    const httpOptions = {
      headers: headersObject
    };

    console.log("im:" +data)
    return await this.http.post(this.baseUrl + "ReserveDateWithDoctor", data, httpOptions).pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(error.error.message);
  }
}
