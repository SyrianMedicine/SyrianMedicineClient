import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { city } from 'src/app/Models/city';
import { DynamicPagination } from 'src/app/Models/Helper/DynamicPagination';
import { state } from 'src/app/Models/states';
import { BaseServices } from '../Common/BaseService.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService extends BaseServices {
  baseUrl = this.HostUrl+"/Account/";
  constructor(private http: HttpClient) {super(); }

  async getUserType(userName: string): Promise<Observable<any>> {
    return await this.http.get(this.baseUrl + "GetUserType/" + userName);
  }
  async getProfilePost(userName: string,paging:DynamicPagination): Promise<Observable<any>> {
    return await this.http.post(this.baseUrl +userName +"/Posts" ,paging);
  }
  async getProfileComment(userName: string,paging:DynamicPagination): Promise<Observable<any>> {
    return await this.http.post(this.baseUrl +userName +"/Comments" ,paging);
  }
  async ChangePassword(oldPassword:string,newPassword:string): Promise<Observable<any>> {
    return await this.http.post(this.baseUrl +"ChangePassword?oldPassword="+oldPassword+"&newPassword="+newPassword ,null,this.getoption());
  }

  async isUserNameExist(username: string) {
    return await this.http.get<boolean>(this.baseUrl + "IsUserNameExist/" + username).pipe(catchError(this.errorHandler));
  }

  async isEmailExist(email: string) {
    return await this.http.get<boolean>(this.baseUrl + "IsEmailExist/" + email).pipe(catchError(this.errorHandler));
  }

  getCities(): Observable<city[]> {
    return this.http.get<city[]>(this.HostUrl + "/Account/GetCities");
  }

  getStates(): Observable<state[]> {
    return this.http.get<state[]>(this.HostUrl + "/Account/GetPersonStates");
  }
  public  getLoadValidateAccountMethod(type:string):(pageNumber: number, pageSize: number)=>Promise<Observable<any>>{
    if(type==='Dcotors')
    {
      return async (pageNumber: number, pageSize: number): Promise<Observable<any>> => {
        return await this.GetValidateDoctorsAccount(pageNumber, pageSize);
      };
    }
    if(type==='Nurses')
    {
      return async (pageNumber: number, pageSize: number): Promise<Observable<any>> => {
        return await this.GetValidateNursesAccount(pageNumber, pageSize);
      };

    }

    return async (pageNumber: number, pageSize: number): Promise<Observable<any>> => {
      return await this.GetValidateHospitalsAccount(pageNumber, pageSize);
    };

  }
  async GetValidateDoctorsAccount(pageNumber: number, pageSize: number): Promise<Observable<any>> {
    return await this.http.post(this.baseUrl + "GetValidateDoctorsAccount", { "pageNumber": pageNumber, "pageSize": pageSize },this.getoption());
  }
  async GetValidateHospitalsAccount(pageNumber: number, pageSize: number): Promise<Observable<any>> {
    return await this.http.post(this.baseUrl + "GetValidateHospitalsAccount", { "pageNumber": pageNumber, "pageSize": pageSize },this.getoption());
  }
  async GetValidateNursesAccount(pageNumber: number, pageSize: number): Promise<Observable<any>> {
    return await this.http.post(this.baseUrl + "GetValidateNursesAccount", { "pageNumber": pageNumber, "pageSize": pageSize },this.getoption());
  }
  async updateAdminProfile(firstName:string,lastName:string,phoneNumber:string,homeNumber:string
    ,gender:Number,location:string,state:Number,city:string): Promise<Observable<any>> {
    return await this.http.post(this.baseUrl + "UpdateAdminProfile", { "firstName": firstName, "lastName":lastName,"phoneNumber":phoneNumber,"homeNumber":homeNumber
    ,"gender":gender,"location":location,"state":state,"city":city},this.getoption());
  }


}
