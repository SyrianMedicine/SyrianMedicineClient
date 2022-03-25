import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router'; 
import { PostOutput } from 'src/app/Models/Post/PostOutput';
import { PostService } from 'src/app/Services/post/post.service'; 

@Component({
  selector: 'app-posts-page',
  templateUrl: './posts-page.component.html',
  styleUrls: ['./posts-page.component.scss']
})
export class PostsPageComponent implements OnInit,OnChanges {

  constructor(private route:Router,private postservce: PostService) { }
  post!:PostOutput; 
  ngOnInit(): void {
    this.loadpost();
  }
  ngOnChanges(changes: SimpleChanges): void {
    
  }
 async loadpost():Promise<void>{
    (await this.postservce.GetPost(1)).subscribe(data => {
      this.post=data.data; 
    }, err => {});
  }
  moveOn(){
    
  }
}
