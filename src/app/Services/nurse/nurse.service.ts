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
  user:string='empty'
  constructor(private http: HttpClient) { super();}
  setValue(userName:string){
    this.user= userName;
  }
  getValue(){
    return this.user;
  }
  async getMostNursesRated(pageNumber: number, pageSize: number): Promise<Observable<any>> {
    return await this.http.post(this.baseUrl + "MostNursesRated", { "pageNumber": pageNumber, "pageSize": pageSize });
  }

  async getNurseInfo(userName: string): Promise<Observable<any>> {
    return await this.http.get(this.baseUrl + userName);
  }
  async  getNursePagination(pageNumber:Number,pageSize:Number,workAtHome:boolean,searchString:string,
    startTimeWork:string,endTimeWork:string,gender:Number):Promise <Observable<any>>{
    return await this.http.post(this.baseUrl + "PaginationNurses",{'pageNumber':pageNumber,'pageSize':pageSize,'workAtHome':workAtHome,
  'searchString':searchString,'startTimeWork':startTimeWork,'endTimeWork':endTimeWork,'gender':gender});
  }

  async updateNurseInfo(nurseId:number,firstName: string, lastName: string,phoneNumber: string,
    aboutMe: string,specialization: string,workAtHome: boolean,startTimeWork: string,endTimeWork: string,
    location: string,state: Number,city: string,homeNumber:string): Promise<Observable<any>> {
    return await this.http.post(this.baseUrl + "UpdateNurse", { "nurseId":nurseId,"firstName": firstName, "lastName": lastName,"phoneNumber": phoneNumber,
    "aboutMe": aboutMe,"specialization": specialization,"workAtHome": workAtHome,"startTimeWork":startTimeWork,"endTimeWork": endTimeWork,
    "location": location,"state": state,"city":city,"homeNumber":homeNumber},this.getoption());
  }
}
