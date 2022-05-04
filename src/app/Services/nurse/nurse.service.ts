import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { city } from 'src/app/Models/city';
import { MostNursesRatedData } from 'src/app/Models/Nurse/MostNursesRated';
import { state } from 'src/app/Models/states';
import { BaseServices } from '../Common/BaseService.service';

@Injectable({
  providedIn: 'root'
})
export class NurseService extends BaseServices {
  baseUrl = this.HostUrl+"/Nurse/";
  constructor(private http: HttpClient) { super();}

  async getMostNursesRated(pageNumber: number, pageSize: number): Promise<Observable<any>> {
    return await this.http.post(this.baseUrl + "MostNursesRated", { "pageNumber": pageNumber, "pageSize": pageSize });
  }

  async getNurseInfo(userName: string): Promise<Observable<any>> {
    return await this.http.get(this.baseUrl + userName);
  }
  async  getNursePagination(pageNumber:Number,pageSize:Number):Promise <Observable<any>>{
    return await this.http.post(this.baseUrl + "PaginationNurses",{'pageNumber':pageNumber,'pageSize':pageSize});
  }
}
