import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core'; 
import { Observable } from 'rxjs';
import { BaseServices } from '../Common/BaseService.service';

@Injectable({
  providedIn: 'root'
})
export class DashbordService extends BaseServices {
  baseUrl = this.HostUrl+"/Dashboard/";
  constructor(private http: HttpClient) {super(); }

  async ValidateDoctor(id: number):Promise<Observable<any>> {
    return await this.http.put(this.baseUrl + "ValidateDoctor/" + id,null,this.getoption());
  }
  async ValidateHospital(id: number):Promise<Observable<any>> {
    return await this.http.put(this.baseUrl + "ValidateHospital/" + id,null,this.getoption());
  }
  async ValidateNurse(id: number):Promise<Observable<any>> {
    return await this.http.put(this.baseUrl + "ValidateNurse/" + id,null,this.getoption());
  }
 
}
