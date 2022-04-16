import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { BaseServices } from '../Common/BaseService.service';

@Injectable({
  providedIn: 'root'
})
export class FollowService extends BaseServices {
  baseUrl = this.HostUrl+"/Follow/";   

  constructor(private http: HttpClient) {super(); }

  async followUser(username: string): Promise<Observable<any>> {
    return await this.http.post(this.baseUrl + username + "/Follow", {}, this.getoption()).pipe(catchError(this.errorHandler));
  }
  async unFollowUser(username: string): Promise<Observable<any>> {
    return await this.http.delete(this.baseUrl + username + "/UnFollow", this.getoption()).pipe(catchError(this.errorHandler));
  }
  async isFollowedByMe(username:string):Promise<Observable<any>>{
    return await this.http.get(this.baseUrl+username+"/IsFollowedByMe",this.getoption()).pipe();
  }

  
 

}
