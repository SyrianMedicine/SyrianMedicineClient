import { Component, Input, OnInit } from '@angular/core'; 
import { CommentOutput } from 'src/app/Models/Comment/CommentOutput';
import { PostOutput } from 'src/app/Models/Post/PostOutput'; 
import { CommentService } from 'src/app/Services/Comment/comment.service';
import { PostService } from 'src/app/Services/post/post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  @Input() post!:PostOutput;
  Commnets!:Array<CommentOutput>;
  displayCom:boolean=true;
  displayCancel:Boolean=true; 
  newComment!:string; 
  //user:usercard=new usercard();
  //@Input() node:any;
  constructor( private postservce: PostService,private Commentservice:CommentService) {
   //this.user.displayName="sarya Tulimat";
 
  }

  ngOnInit(): void {
    this.loadcomment();
  }
 async loadcomment(): Promise<void> {
  (await this.postservce.GetComments(this.post.id,1,3)).subscribe(data => {
    this.Commnets=data.items;
  }, err => {});
  }
  async CreateComment(){ 

    (await this.Commentservice.CreatePostComment(this.post.id,this.newComment)).subscribe(data => {
      this.Commnets.unshift(data.data);
      this.Commnets=this.Commnets;
      console.log(data);
    }, err => {
      console.log(err);
    });
    this.newComment="";  
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
