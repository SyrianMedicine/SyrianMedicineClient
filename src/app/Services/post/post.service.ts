import { NumberSymbol } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  baseUrl = "https://localhost:7017/api/Post/";
  constructor(private http: HttpClient) { }

  getoption():any{
    var headersObject = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem('token'));
    const httpOptions = {
      headers: headersObject
    };
    return httpOptions;
  }
  async getMostPostsRated(pageNumber: number, pageSize: number): Promise<Observable<any>> {
    return await this.http.post(this.baseUrl + "TopMonthPosts", { "pageNumber": pageNumber, "pageSize": pageSize });
  }
  async GettotalLike(id:number): Promise<Observable<any>> {
    return await this.http.get(this.baseUrl + id+"/NumberOfLiks");
  }
  async GetPost(id: number): Promise<Observable<any>> {
    return await this.http.get(this.baseUrl+id);
  }
  async GetComments(id:number, pageNumber: number, pageSize: number): Promise<Observable<any>> {
    return await this.http.post(this.baseUrl+id+"/Comments", { "pageNumber": pageNumber, "pageSize": pageSize });
  }
  async getHomePost(pageNumber: number, pageSize: number): Promise<Observable<any>> {
    return await this.http.post(this.baseUrl + "HomePost", { "pageNumber": pageNumber, "pageSize": pageSize },this.getoption());
  }
  
 

}
