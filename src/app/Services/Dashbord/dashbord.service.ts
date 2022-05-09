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
 
  public  getValidateMethod(type:string):(id:number)=>Promise<Observable<any>>{
    if(type=='Dcotors') 
         return async (id: number): Promise<Observable<any>> => {
          return await this.ValidateDoctor(id);
        }; 
    if(type=='Nurses')
    return async (id: number): Promise<Observable<any>> => {
      return await this.ValidateNurse(id);
    }; 

    return async (id: number): Promise<Observable<any>> => {
      return await this.ValidateHospital(id);
    };  
  }
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
