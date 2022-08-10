import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ObservableNotification } from 'rxjs';
import { city } from 'src/app/Models/city';
import { state } from 'src/app/Models/states';
import { BaseServices } from '../Common/BaseService.service';

@Injectable({
  providedIn: 'root'
})
export class DoctorService extends BaseServices {
  baseUrl = this.HostUrl+"/Doctor/";
  constructor(private http: HttpClient) {super(); }

  async getMostDoctorsRated(pageNumber: number, pageSize: number): Promise<Observable<any>> {
    return await this.http.post(this.baseUrl + "MostDoctorsRated", { "pageNumber": pageNumber, "pageSize": pageSize });
  }

   getDoctorsPagination(pageNumber: Number, pageSize: Number,workAtHome:boolean,searchString:string,
    startTimeWork:string,endTimeWork:string,gender:Number):Observable<any>{
    return  this.http.post(this.baseUrl + "PaginationDoctors", { 'pageNumber': pageNumber, 'pageSize': pageSize,'workAtHome':workAtHome,'searchString':searchString,
    'startTimeWork':startTimeWork,'endTimeWork':endTimeWork,'gender':gender});
  }

  async getDoctorInfo(userName: string): Promise<Observable<any>> {
    return await this.http.get(this.baseUrl + userName);
  }
}
