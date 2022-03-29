import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RatingService {

  baseUrl = "https://localhost:7017/api/Rating/";

  constructor(private http: HttpClient) { }

  async getRateUser(userName: string): Promise<Observable<any>> {
    return this.http.get<any>(this.baseUrl + userName).pipe();
  }

}
