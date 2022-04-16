import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { BaseServices } from '../Common/BaseService.service';

@Injectable({
  providedIn: 'root'
})
export class ReserveHospitalService extends BaseServices {
  baseUrl = this.HostUrl+"/Sick/"; 
 

  constructor(private http: HttpClient) { super();}

  async reserveHospital(body: any): Promise<Observable<any>> {
    var headersObject = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem('token'));
    const httpOptions = {
      headers: headersObject
    };
    return this.http.post(this.baseUrl + "ReserveBedInHospital", body, httpOptions).pipe(catchError(this.errorHandler));
  }
 
}
