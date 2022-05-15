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
  async CheckReserve(id:number,reserveState:number,timeReverse:any){
    return await this.http.post(this.HostUrl + "/Hospital/CheckReserve", { 'id': id, 'reserveState': reserveState, "timeReverse": timeReverse }, this.getoption());
  }
  async getReserveData(pageNumber: number, pageSize: number): Promise<Observable<any>> {
      return await this.http.post(this.HostUrl + "/Hospital/GetReserveNurseData", { 'pageNumber': pageNumber, 'pageSize': pageSize }, this.getoption());
  }
 
}
