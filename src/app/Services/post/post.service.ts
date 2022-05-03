import { NumberSymbol } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DynamicPagination } from 'src/app/Models/Helper/DynamicPagination';
import { PostCreateInput } from 'src/app/Models/Post/PostCreateInput';
import { BaseServices } from '../Common/BaseService.service';

@Injectable({
  providedIn: 'root'
})
export class PostService extends BaseServices {
  baseUrl = this.HostUrl+"/Post/"; 
  constructor(private http: HttpClient) {super() }

   
  async getMostPostsRated(pageNumber: number, pageSize: number): Promise<Observable<any>> {
    return await this.http.post(this.baseUrl + "TopMonthPosts", { "pageNumber": pageNumber, "pageSize": pageSize });
  }
  async GettotalLike(id:number): Promise<Observable<any>> {
    return await this.http.get(this.baseUrl + id+"/NumberOfLiks");
  }
  async GetPost(id: number): Promise<Observable<any>> {
    return await this.http.get(this.baseUrl+id);
  }
  async GetComments(id:number, Pagination:DynamicPagination): Promise<Observable<any>> {
    return await this.http.post(this.baseUrl+id+"/Comments", Pagination);
  }
  async getHomePost(Pagination:DynamicPagination): Promise<Observable<any>> {
    return await this.http.post(this.baseUrl + "HomePost", Pagination,this.getoption());
  }
  async CreatePost(input:PostCreateInput): Promise<Observable<any>>{    
    const form: FormData = new FormData();
      form.append("PostText", input.PostText); 
      form.append("postTitle", input.PostTitle); 
      if(input.Media!=null) 
      form.append("Media", input.Media,input.Media.name);
      if(input.TagsID!=null&&input.TagsID.length>0) 
      form.append("TagsID",JSON.stringify(input.TagsID)); 
      return await this.http.post(this.baseUrl + "Create", form,this.getoption());
  }
}
