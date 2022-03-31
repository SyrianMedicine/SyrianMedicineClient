import { Component, Input, OnInit } from '@angular/core'; 
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CommentOutput } from 'src/app/Models/Comment/CommentOutput';
import { PostOutput } from 'src/app/Models/Post/PostOutput'; 
import { CommentService } from 'src/app/Services/Comment/comment.service';
import { LikeService } from 'src/app/Services/Like/like.service';
import { PostService } from 'src/app/Services/post/post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  @Input() post!:PostOutput;
  Commnets!:Array<CommentOutput>;
  liked:boolean=false;
  numberofLike:number=0;
  
///////////////////////////////////////

  displayCom:boolean=true;
  displayCancel:Boolean=true; 
  newComment!:string;
  LikeEnablebutton:boolean=false;

///////////////////////////////////////
  constructor(private router: Router,private likeService:LikeService, private postservce: PostService,private Commentservice:CommentService,private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.loadcomment();
    this.gettotalikes();
    this.getMylikeStatus(); 

  }
  async gettotalikes(){
    (await this.postservce.GettotalLike(this.post.id)).subscribe(data => {
      this.numberofLike=data.data; 
    }, err => {});
  }
  async getMylikeStatus(){

    if(this.isAuthrized())
    (await this.likeService.IsPostliked(this.post.id)).subscribe(data => {
      this.liked=data.data; 
    }, err => {});
    this.LikeEnablebutton=true;
  }

 async loadcomment(): Promise<void> {
  (await this.postservce.GetComments(this.post.id,1,3)).subscribe(data => {
    this.Commnets=data.items;
  }, err => {});
  }
  isAuthrized():Boolean{
    return localStorage.getItem('token')!=null;
  }
  async CreateComment(){ 
    if(!this.isAuthrized())
    this.router.navigate(['/Login']);
    (await this.Commentservice.CreatePostComment(this.post.id,this.newComment)).subscribe(data => {
      this.Commnets.unshift(data.data);
      this.Commnets=this.Commnets;
      this.snackBar.open(data.message, 'close', {
        duration: 2000,
        panelClass:['green-snackbar'],
        horizontalPosition: 'start',
        verticalPosition: 'bottom',
      });
    }, err => { 
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

  onLikelicked(){
    this.LikeEnablebutton=false;
    if(this.isAuthrized())
    {

      if(this.liked){
        
        this.unLike();
      }
      else
      { 
        this.Like();
      }     
    }else this.router.navigate(['Login']);
  }
  async Like(){
    (await this.likeService.Likepost(this.post.id)).subscribe(data => {
      this.liked=data.data;
    this.gettotalikes(); 

    this.snackBar.open(data.message, 'close', {
          duration: 2000,
          panelClass:['green-snackbar'],
          horizontalPosition: 'start',
          verticalPosition: 'bottom',
        });
    }, err => {});
    this.LikeEnablebutton=true;
  }
 async  unLike(){
    (await this.likeService.UnLikepost(this.post.id)).subscribe(data => {
      this.liked=!data.data; 
      this.snackBar.open(data.message, 'close', {
          duration: 2000,
          panelClass:['green-snackbar'],
          horizontalPosition: 'start',
          verticalPosition: 'bottom',
        });
      this.gettotalikes();
    }, err => {});
    this.LikeEnablebutton=true;
  }
}
