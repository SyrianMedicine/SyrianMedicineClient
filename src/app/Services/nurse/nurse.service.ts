import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MostNursesRatedData } from 'src/app/Models/Nurse/MostNursesRated';

@Injectable({
  providedIn: 'root'
})
export class NurseService {

  baseUrl = "https://localhost:7017/api/";
  constructor(private http: HttpClient) { }
  async getMostNursesRated(pageNumber: number, pageSize: number): Promise<Observable<any>> {
    return await this.http.post(this.baseUrl + "Nurse/MostNursesRated", { "pageNumber": pageNumber, "pageSize": pageSize });
  }

}
