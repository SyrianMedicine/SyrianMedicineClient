import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DynamicPagination } from 'src/app/Models/Helper/DynamicPagination';
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
 
}
