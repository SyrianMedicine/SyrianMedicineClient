import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FollowService {

  baseUrl = "https://localhost:7017/api/Follow/";

  constructor(private http: HttpClient) { }

  async followUser(username: string): Promise<Observable<any>> {
    return await this.http.post(this.baseUrl + username + "/Follow", {}, this.getoption()).pipe(catchError(this.errorHandler));
  }
  async unFollowUser(username: string): Promise<Observable<any>> {
    return await this.http.post(this.baseUrl + username + "/UnFollow", {}, this.getoption()).pipe(catchError(this.errorHandler));
  }


  getoption(): any {
    var headersObject = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem('token'));
    const httpOptions = {
      headers: headersObject
    };
    return httpOptions;
  }
  errorHandler(error: HttpErrorResponse) {
    return throwError(error.error.message);
  }

}
