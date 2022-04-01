import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; 
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  baseUrl = "https://localhost:7017/api/Comment/";
  constructor(private http: HttpClient) { }
  getoption():any{
    var headersObject = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem('token'));
    const httpOptions = {
      headers: headersObject
    };
    return httpOptions;
  }
  async GetSubComments(id:number, pageNumber: number, pageSize: number): Promise<Observable<any>> {
    return await this.http.post(this.baseUrl + id+"/SubComments", { "pageNumber": pageNumber, "pageSize": pageSize });
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
