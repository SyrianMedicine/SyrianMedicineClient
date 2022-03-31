import { Component, Input, OnInit,  } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CommentOutput } from 'src/app/Models/Comment/CommentOutput';
import { CommentService } from 'src/app/Services/Comment/comment.service';
import { LikeService } from 'src/app/Services/Like/like.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {
  @Input() Commnet!:CommentOutput;
  @Input() depth:number=0;
  SubCommnets!:Array<CommentOutput>;
  liked:boolean=false;
  numberofLike:number=0; 

///////////////////////////////////////
  
  displayRep:boolean=true;
  displayCancel:boolean=true;
  commentText!:string;
  LikeEnablebutton:boolean=false;
  constructor(private router: Router,private likeService:LikeService,private commentService: CommentService,private snackBar: MatSnackBar) {
  }
  isAuthrized():Boolean{
    return localStorage.getItem('token')!=null;
  }
  ngOnInit(): void {
    this.loadSubcomment(); 
    this.gettotalikes();
    this.getMylikeStatus();
  }
  async gettotalikes(){
    (await this.commentService.GettotalLike(this.Commnet.id)).subscribe(data => {
      this.numberofLike=data.data; 
    }, err => {});
  }
  async getMylikeStatus(){

    if(this.isAuthrized())
    (await this.likeService.IsCommentliked(this.Commnet.id)).subscribe(data => {
      this.liked=data.data;  
    }, err => {});
    this.LikeEnablebutton=true;
  }
  async loadSubcomment(): Promise<void> {
    (await this.commentService.GetSubComments(this.Commnet.id,1,3)).subscribe(da => {
      this.SubCommnets=da.items;
    }, err => {});
    }
    async CreateSubComment(){
      if(!this.isAuthrized())
        this.router.navigate(['/Login']);
      (await this.commentService.CreateSubComment(this.Commnet.id,this.commentText)).subscribe(data => {
        this.SubCommnets.unshift(data.data);
        this.SubCommnets=this.SubCommnets;
        this.snackBar.open(data.message, 'close', {
          duration: 2000,
          panelClass:['green-snackbar'],
          horizontalPosition: 'start',
          verticalPosition: 'bottom',
        });
      }, err => {  
      });
      this.commentText="";
    }
    displayReplay(){
      this.displayRep=false;
      this.displayCancel=false
    }
    cancelReplay(){
      this.displayRep=true;
      this.displayCancel=true;
    }
   onLikelicked(){
    this.LikeEnablebutton=false;

    if(this.isAuthrized()){

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
    (await this.likeService.LikeComment(this.Commnet.id)).subscribe(data => {
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
    (await this.likeService.UnLikeComment(this.Commnet.id)).subscribe(data => {
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
