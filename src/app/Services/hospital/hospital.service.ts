import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MostHospitalsRatedData } from 'src/app/Models/Hospital/MostHospitalsRated';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {
  baseUrl = "https://localhost:7017/api/Hospital/";

  constructor(private http: HttpClient) { }

  async getMostHospitalsRated(pageNumber: number, pageSize: number): Promise<Observable<any>> {
    return await this.http.post(this.baseUrl + "MostHospitalsRated", { "pageNumber": pageNumber, "pageSize": pageSize });
  }
  async getHospitalInfo(username: string): Promise<Observable<any>> {
    return await this.http.get(this.baseUrl + username);
  }
}
