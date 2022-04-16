import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { BaseServices } from '../Common/BaseService.service';

@Injectable({
  providedIn: 'root'
})
export class ReserveDoctorOrNurseService extends BaseServices {
  baseUrl = this.HostUrl+"/Sick/"; 
 

  constructor(private http: HttpClient) {super(); }

  async ReserveDate(data: any, type: number): Promise<Observable<any>> {
    
    if (type == 1)
      return await this.http.post(this.baseUrl + "ReserveDateWithDoctor", data, this.getoption()).pipe(catchError(this.errorHandler));
    else
      return await this.http.post(this.baseUrl + "ReserveDateWithNurse", data, this.getoption()).pipe(catchError(this.errorHandler));
  }

 
}
