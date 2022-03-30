import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router'; 
import { CommentOutput } from 'src/app/Models/Comment/CommentOutput';
import { PostOutput } from 'src/app/Models/Post/PostOutput';
import { usercard } from 'src/app/Models/usercard/usercard';
import { PostService } from 'src/app/Services/post/post.service'; 

@Component({
  selector: 'app-posts-page',
  templateUrl: './posts-page.component.html',
  styleUrls: ['./posts-page.component.scss']
})
export class PostsPageComponent implements OnInit,OnChanges {

  constructor(private route:Router,private postservce: PostService) { }
  post!:PostOutput;
  post2!:PostOutput;
 // root={text:"hello this is post",
  //child:[{text:"hello this is comment",child:[{text:"hello this is SubComment",child:[{text:"hello this is SubComment",child:[]},{text:"hello this is SubComment",child:[]}]},{text:"hello this is SubComment",child:[]}]},
  //{text:"hello this is comment",child:[{text:"hello this is SubComment",child:[]},{text:"hello this is Subcomment",child:[]}]}]}
  ngOnInit(): void {
    this.loadpost();
  }
  ngOnChanges(changes: SimpleChanges): void {
    
  }
 async loadpost():Promise<void>{
    (await this.postservce.GetPost(1)).subscribe(data => {
      this.post=data.data; 
    }, err => {});
    (await this.postservce.GetPost(2)).subscribe(data => {
      this.post2=data.data; 
    }, err => {});
  }
  moveOn(){
    
  }
}
