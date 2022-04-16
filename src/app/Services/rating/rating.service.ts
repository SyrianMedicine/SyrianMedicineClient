import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { BaseServices } from '../Common/BaseService.service';

@Injectable({
  providedIn: 'root'
})
export class RatingService extends BaseServices {
  baseUrl = this.HostUrl+"/Rating/"; 

  constructor(private http: HttpClient) {super(); }

  async getRateUser(userName: string): Promise<Observable<any>> {
    return this.http.get<any>(this.baseUrl + userName).pipe();
  }

  async rateUser(username: string, star: number): Promise<Observable<any>> {
    var headersObject = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem('token'));
    const httpOptions = {
      headers: headersObject
    };

    var body: any = {
      "username": username,
      "starsNumber": +star
    };
    return this.http.post<any>(this.baseUrl + "Rate", body, httpOptions).pipe(catchError(this.errorHandler));
  }

  async myRatingForUser(username: string): Promise<Observable<any>> {
    var headersObject = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem('token'));
    const httpOptions = {
      headers: headersObject
    };
    return await this.http.get<any>(this.baseUrl + username + "/MyRating", httpOptions).pipe();
  }

}
