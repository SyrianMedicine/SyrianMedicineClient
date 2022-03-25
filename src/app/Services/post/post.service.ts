import { NumberSymbol } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  baseUrl = "https://localhost:7017/api/";
  constructor(private http: HttpClient) { }

  async getMostPostsRated(pageNumber: number, pageSize: number): Promise<Observable<any>> {
    return await this.http.post(this.baseUrl + "Post/TopMonthPosts", { "pageNumber": pageNumber, "pageSize": pageSize });
  }

  async GetPost(id: number): Promise<Observable<any>> {
    return await this.http.get(this.baseUrl + "Post/"+id);
  }
  async GetComments(id:number, pageNumber: number, pageSize: number): Promise<Observable<any>> {
    return await this.http.post(this.baseUrl + "Post/"+id+"/Comments", { "pageNumber": pageNumber, "pageSize": pageSize });
  }
  async GetSubComments(id:number, pageNumber: number, pageSize: number): Promise<Observable<any>> {
    return await this.http.post(this.baseUrl + "Comment/"+id+"/SubComments", { "pageNumber": pageNumber, "pageSize": pageSize });
  } 

}
