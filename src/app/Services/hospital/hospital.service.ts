import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { city } from 'src/app/Models/city';
import { department } from 'src/app/Models/Hospital/Department/department';
import { BaseServices } from '../Common/BaseService.service';

@Injectable({
  providedIn: 'root'
})
export class HospitalService extends BaseServices {
  baseUrl = this.HostUrl+"/Hospital/";
  user:string='empty'
  constructor(private http: HttpClient) {super(); }

  setValue(userName:string){
    this.user= userName;
    console.log(this.user)
  }

  getValue(){
    console.log(this.user)
    return this.user;
  }

  async getMostHospitalsRated(pageNumber: number, pageSize: number): Promise<Observable<any>> {
    return await this.http.post(this.baseUrl + "MostHospitalsRated", { "pageNumber": pageNumber, "pageSize": pageSize });
  }
  async getHospitalInfo(username: string): Promise<Observable<any>> {
    return await this.http.get(this.baseUrl + username);
  }

  async getHospitalsPagination(pageNumber: number, pageSize: number,searchString:string,departmentName:string,hasAvialbleBed:boolean): Promise<Observable<any>> {
    return await this.http.post(this.baseUrl + "PaginationHospitals", { "pageNumber": pageNumber, "pageSize": pageSize ,"searchString":searchString,
    "departmentName":departmentName,"hasAvialbleBed":hasAvialbleBed});
  }

  async updateHospitalInfo(id:Number,name: string,location: string,aboutHospital:string,phoneNumer:string,
    homeNumber:string,webSite:string,city:string): Promise<Observable<any>> {
    return await this.http.post(this.baseUrl + "UpdateHospital", { "name":name,"location": location,"aboutHospital":aboutHospital,"phoneNumer":phoneNumer,
      "homeNumber":homeNumber,"webSite":webSite,"city":city});
  }

  async getDepartmentForHospital(username: string): Promise<Observable<department[]>> {
    return await this.http.get<department[]>(this.baseUrl + "DepartmentsFor/" + username);
  }

}
