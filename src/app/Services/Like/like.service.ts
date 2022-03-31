import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LikeService {

  baseUrl = "https://localhost:7017/api/Like/";
  getoption():any{
    var headersObject = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem('token'));
    const httpOptions = {
      headers: headersObject
    };
    return httpOptions;
  }
  constructor(private http: HttpClient) { }

  async LikeComment(id: number): Promise<Observable<any>> {
    return await this.http.post(this.baseUrl+"LikeComment?CommentId="+id,null,this.getoption());
  }
  async Likepost(id: number): Promise<Observable<any>> {
    return await this.http.post(this.baseUrl+"LikePost?PostId="+id,null,this.getoption());
  }
  async UnLikeComment(id: number): Promise<Observable<any>> {
    return await this.http.post(this.baseUrl+"UnLikeComment?CommentId="+id,null,this.getoption());
  }
  async UnLikepost(id: number): Promise<Observable<any>> {
    return await this.http.post(this.baseUrl+"UnLikePost?PostId="+id,null,this.getoption());
  }
  async deleteLike(id: number): Promise<Observable<any>> {
    return await this.http.post(this.baseUrl+"Unlike?LikIid="+id,null,this.getoption());
  }
  async IsCommentliked(id: number): Promise<Observable<any>> {
    return await this.http.post(this.baseUrl+"IsCommentliked?CommentId="+id,null,this.getoption());
  } 
  async IsPostliked(id: number): Promise<Observable<any>> {
    return await this.http.post(this.baseUrl+"IsPostliked?PostId="+id,null,this.getoption());
  }
  
}
