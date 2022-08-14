import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { city } from 'src/app/Models/city';
import { BaseServices } from '../Common/BaseService.service';

@Injectable({
  providedIn: 'root'
})
export class SickService extends BaseServices {
  baseUrl = this.HostUrl+"/Sick/";
  constructor(private http: HttpClient) { super();}
  async getSickInfo(userName: string): Promise<Observable<any>> {
    return await this.http.get(this.baseUrl + userName);
  }

  async updateSick(firstName:string,lastName:string,phoneNumber:string,homeNumber:string
    ,gender:Number,location:string,state:Number,city:string): Promise<Observable<any>> {
    return await this.http.post(this.baseUrl + "UpdateAdminProfile", { "firstName": firstName, "lastName":lastName,"phoneNumber":phoneNumber,"homeNumber":homeNumber
    ,"gender":gender,"location":location,"state":state,"city":city},this.getoption());
  }

}
