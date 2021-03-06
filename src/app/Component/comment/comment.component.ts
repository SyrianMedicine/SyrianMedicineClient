import { ScrollStrategy, ScrollStrategyOptions } from '@angular/cdk/overlay';
import { Component, Input, OnInit, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CommentOutput } from 'src/app/Models/Comment/CommentOutput';
import { PaginationOutput } from 'src/app/Models/Helper/PaginationOutput';
import { CommentService } from 'src/app/Services/Comment/comment.service';
import { LikeService } from 'src/app/Services/Like/like.service';
import { SyrianMedSnakBarService } from 'src/app/Services/SyrianMedSnakBar/syrian-med-snak-bar.service';
import { LikesComponent } from '../Likes/likes/likes.component';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {
  @Input() Commnet!: CommentOutput;
  @Input() depth: number = 0;
  isediting: boolean = false;
  SubCommnets: Array<CommentOutput> = new Array<CommentOutput>();;
  liked: boolean = false;
  numberofLike: number = 0;
  editeCliked: boolean = false;
  isNewCommentCreateing: boolean = false;
  isLoding: boolean = false;
  @Output() Ondeleted: EventEmitter<CommentOutput> = new EventEmitter();
  displayRep: boolean = true;
  displayCancel: boolean = true;
  commentText!: string;
  LikeEnablebutton: boolean = false;
  Subvisible: boolean = false;
  ///////////////////////////////////////

  pagination: PaginationOutput = new PaginationOutput(3);
  CommentsEnded: boolean = false;
  constructor(private changeDetectorRef: ChangeDetectorRef,private dialog:MatDialog, private router: Router, private likeService: LikeService, private commentService: CommentService, private snackBar: SyrianMedSnakBarService) {
  }
  ChildeDeleted(ChildeCommnet: CommentOutput) {
    for (let index = 0; index < this.SubCommnets.length; index++) {
      if (this.SubCommnets[index].id == ChildeCommnet.id) {
        this.SubCommnets.splice(index, 1);
        this.changeDetectorRef.detectChanges();
        break;
      }
    }
  }
  ShowLikes(){ 
    let dialogRef = this.dialog.open(LikesComponent, { 
      width: '450px',  
      panelClass:['Likesdilog'],
      data: {
        "type":"Comment",
        "Id":this.Commnet.id
      }
    });
  }
  isAuthrized(): Boolean {
    return localStorage.getItem('token') != null;
  }
  isOwnedbyMe(): Boolean {
    let username = localStorage.getItem("username");
    if (username == null)
      return false
    return username.toLowerCase() == this.Commnet.user.userName.toLowerCase();
  }
  ngOnInit(): void {
    this.loadSubcomment();
    this.gettotalikes();
    this.getMylikeStatus();
  }
  async gettotalikes() {
    (await this.commentService.GettotalLike(this.Commnet.id)).subscribe(data => {
      this.numberofLike = data.data;
    }, err => { });
  }
  async getMylikeStatus() {

    this.LikeEnablebutton = false;
    if (this.isAuthrized()) {
      (await this.likeService.IsCommentliked(this.Commnet.id)).subscribe(data => {
        this.liked = data.data;

        this.LikeEnablebutton = true;
      }, err => {

        this.LikeEnablebutton = true;
      });
    } else
      this.LikeEnablebutton = true;
  }
  async loadSubcomment(): Promise<void> {
    this.isLoding = true;
    (await this.commentService.GetSubComments(this.Commnet.id, this.pagination.getNextDynamicPaginationObject())).subscribe(data => {
      for (let index = 0; index < data.items.length; index++) {
        this.SubCommnets.push(data.items[index]);
      }
      this.pagination.update(data);
      this.CommentsEnded = this.pagination.isEnded();
      this.isLoding = false;
      this.changeDetectorRef.detectChanges();
    }, err => {
      this.isLoding = false;
    });
  }
  async CreateSubComment() {
    if (!this.isAuthrized()) {
      this.snackBar.openError("please login");
      this.router.navigate(['/Login'],{queryParams:{returnUrl:this.router.url}});
    }
    this.isNewCommentCreateing = true;
    this.Subvisible = true;
    (await this.commentService.CreateSubComment(this.Commnet.id, this.commentText)).subscribe(data => {
      this.SubCommnets.unshift(data.data);
      this.snackBar.openSuccess(data.message)
      this.isNewCommentCreateing = false;
      this.changeDetectorRef.detectChanges();
    }, err => {
      this.isNewCommentCreateing = false;
      this.snackBar.openError(err.error.message);
    });
    this.commentText = "";
  }
  async deleteComment() {
    if (!this.isAuthrized()) {
      this.snackBar.openError("please login");
      this.router.navigate(['/Login'],{queryParams:{returnUrl:this.router.url}});
    }
    (await this.commentService.Delete(this.Commnet.id)).subscribe(data => {
      this.snackBar.openSuccess(data.message);
      this.Ondeleted.emit(this.Commnet);
    }, err => {
      this.snackBar.openError(err.error.message);
    });
  }
  showSubComment() {
    this.Subvisible = true;
  }
  async EditeSubComment() {
    if (this.commentText == this.Commnet.text) {
      this.snackBar.openError("its same the old ");
      return;
    }
    if (!this.isAuthrized()) {
      this.snackBar.openError("please login");
      this.router.navigate(['/Login'],{queryParams:{returnUrl:this.router.url}});
    }
    this.isediting=true;
    (await this.commentService.Update(this.Commnet.id, this.commentText)).subscribe(data => {
      this.Commnet = data.data;
      this.isediting=false;
      this.snackBar.openSuccess(data.message);
    }, err => {
      this.isediting=false;
      this.snackBar.openError(err.error.message);
    });
  }
  displayReplay(num: boolean) {
    if (this.editeCliked != num) {
      if (num == true)
        this.commentText = this.Commnet.text;
      if (num == false)
        this.commentText = "";
    }
    this.editeCliked = num;
    this.displayRep = false;
    this.displayCancel = false
  }
  cancelReplay() {
    this.displayRep = true;
    this.displayCancel = true;
  }
  onLikelicked() {
    this.LikeEnablebutton = false;

    if (this.isAuthrized()) {

      if (this.liked) {
        this.unLike();
      }
      else {
        this.Like();
      }
    } else {
      this.snackBar.openError("please login");
      this.router.navigate(['Login'],{queryParams:{returnUrl:this.router.url}});
    }
  }
  async Like() {
    (await this.likeService.LikeComment(this.Commnet.id)).subscribe(data => {
      this.liked = data.data;
      this.gettotalikes();
      this.LikeEnablebutton = true;
      this.snackBar.openSuccess(data.message);
    }, err => {
      this.snackBar.openError(err.error.message);
      this.LikeEnablebutton = true;
    });
  }

  async unLike() {
    (await this.likeService.UnLikeComment(this.Commnet.id)).subscribe(data => {
      this.liked = !data.data;
      this.snackBar.openSuccess(data.message);
      this.LikeEnablebutton = true;
      this.gettotalikes();
    }, err => {
      this.snackBar.openError(err.error.message);
      this.LikeEnablebutton = true;
    });
  }


}
