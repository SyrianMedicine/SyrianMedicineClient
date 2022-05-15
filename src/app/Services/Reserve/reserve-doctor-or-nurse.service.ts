import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { async } from '@angular/core/testing';
import { catchError, Observable, throwError } from 'rxjs';
import { BaseServices } from '../Common/BaseService.service';

@Injectable({
  providedIn: 'root'
})
export class ReserveDoctorOrNurseService extends BaseServices {
  baseUrl = this.HostUrl + "/Sick/";



  constructor(private http: HttpClient) { super(); }

  async ReserveDate(data: any, type: number): Promise<Observable<any>> {

    if (type == 1)
      return await this.http.post(this.baseUrl + "ReserveDateWithDoctor", data, this.getoption()).pipe(catchError(this.errorHandler));
    else
      return await this.http.post(this.baseUrl + "ReserveDateWithNurse", data, this.getoption()).pipe(catchError(this.errorHandler));
  }
  async getReserveData(pageNumber: number, pageSize: number): Promise<Observable<any>> {
    if (localStorage.getItem('userType') == 'Doctor')
      return await this.http.post(this.HostUrl + "/Doctor/GetReserveDoctorData", { 'pageNumber': pageNumber, 'pageSize': pageSize }, this.getoption());
    else if (localStorage.getItem('userType') == 'Nurse')
      return await this.http.post(this.HostUrl + "/Nurse/GetReserveNurseData", { 'pageNumber': pageNumber, 'pageSize': pageSize }, this.getoption());
    else
      return await this.http.post(this.HostUrl + "/Hospital/GetReserveNurseData", { 'pageNumber': pageNumber, 'pageSize': pageSize }, this.getoption());
  }
  async CheckReserve(userName: string, reserveState: number, timeReverse: Date): Promise<Observable<any>> {
    if (localStorage.getItem('userType') == 'Doctor')
      return await this.http.post(this.HostUrl + "/Doctor/CheckReserve", { 'userName': userName, 'reserveState': reserveState, "timeReverse": timeReverse }, this.getoption());
    if (localStorage.getItem('userType') == 'Nurse')
      return await this.http.post(this.HostUrl + "/Nurse/CheckReserve", { 'userName': userName, 'reserveState': reserveState, "timeReverse": timeReverse }, this.getoption());
    else
      return await this.http.post(this.HostUrl + "/Hospital/CheckReserve", { 'userName': userName, 'reserveState': reserveState, "timeReverse": timeReverse }, this.getoption());

  }

}
