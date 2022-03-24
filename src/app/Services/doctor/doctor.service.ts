import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ObservableNotification } from 'rxjs';
import { MostDoctorsRatedData } from 'src/app/Models/Doctor/MostDoctorsRated';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  baseUrl = "https://localhost:7017/api/";
  constructor(private http: HttpClient) { }
  async getMostDoctorsRated(pageNumber: number, pageSize: number): Promise<Observable<any>> {
    return await this.http.post(this.baseUrl + "Doctor/MostDoctorsRated", { "pageNumber": pageNumber, "pageSize": pageSize });
  }

    // return doctors Pagination ...
    async getDoctorsPagination(pageNumber:Number , pageSize:Number):Promise <Observable<any>>{
      return await this.http.post(this.baseUrl + "Doctor/PaginationDoctors",{'pageNummber':pageNumber,'pageSize':pageSize});
    }
}
