import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  baseUrl = "https://localhost:7017/api/Account/";
  constructor(private http: HttpClient) { }

  async getUserType(userName: string): Promise<Observable<any>> {
    return await this.http.get(this.baseUrl + "GetUserType/" + userName);
  }

}
