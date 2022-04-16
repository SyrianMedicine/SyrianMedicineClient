import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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

}
