import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MostHospitalsRatedData } from 'src/app/Models/Hospital/MostHospitalsRated';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {
  baseUrl = "https://localhost:7017/api/";

  constructor(private http: HttpClient) { }

  async getMostHospitalsRated(pageNumber: number, pageSize: number):Promise<Observable<any>> {
    return await this.http.post(this.baseUrl + "Hospital/MostHospitalsRated", { "pageNumber": pageNumber, "pageSize": pageSize });
  }
}
