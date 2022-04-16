import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; 
import { Observable } from 'rxjs';
import { DynamicPagination } from 'src/app/Models/Helper/DynamicPagination';
import { BaseServices } from '../Common/BaseService.service'; 
 
@Injectable({
  providedIn: 'root'
})
export class CommentService extends BaseServices {
  baseUrl = this.HostUrl+"/Comment/";
  constructor(private http: HttpClient) {super(); }
 
  async GetSubComments(id:number,Pagination:DynamicPagination): Promise<Observable<any>> {
    return await this.http.post(this.baseUrl + id+"/SubComments", Pagination);
  }
  async GettotalLike(id:number): Promise<Observable<any>> {
    return await this.http.get(this.baseUrl + id+"/NumberOfLiks");
  }
  async CreatePostComment(postid:number,Text:String): Promise<Observable<any>> {
    var body:any = {
        "commentText": Text,
        "postid": postid
    };
    return await this.http.post(this.baseUrl + "CreatePostComment", body,this.getoption());
  }
  async CreateSubComment(commentId:number,Text:String): Promise<Observable<any>> {
    var body:any = {
      "commentText": Text,
      "commentId": commentId
    };
    return await this.http.post(this.baseUrl + "CreateSubComment",body,this.getoption());
  }
  async CreateAccountComment(accountUserName:String,Text:String): Promise<Observable<any>> {
    var body:any = {
        "commentText": Text,
        "accountUserName": accountUserName
    };
    return await this.http.post(this.baseUrl + "CreateAccountComment", body,this.getoption());
  }
  async Update(commentId:number,Text:String):Promise<Observable<any>>{
    var body:any = {
      "id": commentId,
      "commentText": Text
    };
    return await this.http.post(this.baseUrl + "Update",body,this.getoption());
  }
  async Delete(id:number):Promise<Observable<any>>{
    return await this.http.delete(this.baseUrl + "Delete?id="+id,this.getoption());
  }
  
}
