import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; 
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  baseUrl = "https://localhost:7017/api/";
  constructor(private http: HttpClient) { }
  getoption():any{
    var headersObject = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem('token'));
    const httpOptions = {
      headers: headersObject
    };
    return httpOptions;
  }
  async GetSubComments(id:number, pageNumber: number, pageSize: number): Promise<Observable<any>> {
    return await this.http.post(this.baseUrl + "Comment/"+id+"/SubComments", { "pageNumber": pageNumber, "pageSize": pageSize });
  }
  async CreatePostComment(postid:number,Text:String): Promise<Observable<any>> {
    var body:any = {
        "commentText": Text,
        "postid": postid
    };
    return await this.http.post(this.baseUrl + "Comment/CreatePostComment", body,this.getoption());
  }
  async CreateSubComment(commentId:number,Text:String): Promise<Observable<any>> {
    var body:any = {
      "commentText": Text,
      "commentId": commentId
    };
    return await this.http.post(this.baseUrl + "Comment/CreateSubComment",body,this.getoption());
  }
  async CreateAccountComment(accountUserName:String,Text:String): Promise<Observable<any>> {
    var body:any = {
        "commentText": Text,
        "accountUserName": accountUserName
    };
    return await this.http.post(this.baseUrl + "Comment/CreateAccountComment", body,this.getoption());
  }
}
