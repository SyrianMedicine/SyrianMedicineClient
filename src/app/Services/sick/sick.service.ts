import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SickService {

  baseUrl = "https://localhost:7017/api/Sick/";
  constructor(private http: HttpClient) { }

  async getSickInfo(userName: string): Promise<Observable<any>> {
    return await this.http.get(this.baseUrl + userName);
  }
}
