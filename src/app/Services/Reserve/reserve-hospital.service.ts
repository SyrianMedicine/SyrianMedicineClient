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
   
    return this.http.post(this.baseUrl + "ReserveBedInHospital", body, this.getoption()).pipe(catchError(this.errorHandler));
  }
 
}
