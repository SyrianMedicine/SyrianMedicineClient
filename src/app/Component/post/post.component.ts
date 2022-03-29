import { Component, DoCheck, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { async } from '@angular/core/testing';
import { CommentOutput } from 'src/app/Models/Comment/CommentOutput';
import { PostOutput } from 'src/app/Models/Post/PostOutput';
import { usercard } from 'src/app/Models/usercard/usercard';
import { PostService } from 'src/app/Services/post/post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  @Input() post!:PostOutput;
  Commnets!:Array<CommentOutput>;
  user:usercard=new usercard();
  @Input() node:any;
  displayCom:boolean=true;
  displayCancel:Boolean=true;
  constructor( private postservce: PostService) {
   this.user.displayName="sarya Tulimat";
  }

  ngOnInit(): void {
   // this.loadcomment();
  }
 async loadcomment(): Promise<void> {
  (await this.postservce.GetComments(this.post.id,1,3)).subscribe(data => {
    this.Commnets=data.items;
  }, err => {});
  }


  displayComment(){
    this.displayCom=false;
    this.displayCancel=false;
  }
  cancelComment(){
    this.displayCancel=true;
    this.displayCom=true;
  }
}
