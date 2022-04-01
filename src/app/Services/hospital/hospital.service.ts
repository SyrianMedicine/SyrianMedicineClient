import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { department } from 'src/app/Models/Hospital/Department/department';

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

  async getHospitalsPagination(pageNumber: number, pageSize: number): Promise<Observable<any>> {
    return await this.http.post(this.baseUrl + "PaginationHospitals", { "pageNumber": pageNumber, "pageSize": pageSize });
  }

  async getDepartmentForHospital(username: string): Promise<Observable<department[]>> {
    return await this.http.get<department[]>(this.baseUrl + "DepartmentsFor/" + username);
  }

}
