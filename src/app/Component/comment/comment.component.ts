import { Component, Input, OnInit, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CommentOutput } from 'src/app/Models/Comment/CommentOutput';
import { PaginationOutput } from 'src/app/Models/Helper/PaginationOutput';
import { CommentService } from 'src/app/Services/Comment/comment.service';
import { LikeService } from 'src/app/Services/Like/like.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {
  @Input() Commnet!: CommentOutput;
  @Input() depth: number = 0;
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
  constructor(private changeDetectorRef: ChangeDetectorRef, private router: Router, private likeService: LikeService, private commentService: CommentService, private snackBar: MatSnackBar) {
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
      this.snackBarError("please login");
      this.router.navigate(['/Login']);
    }
    this.isNewCommentCreateing = true;
    this.Subvisible = true;
    (await this.commentService.CreateSubComment(this.Commnet.id, this.commentText)).subscribe(data => {
      this.SubCommnets.unshift(data.data);
      this.snackBarSuccess(data.message)
      this.isNewCommentCreateing = false;
      this.changeDetectorRef.detectChanges();
    }, err => {
      this.isNewCommentCreateing = false;
      this.snackBarError(err.error.message);
    });
    this.commentText = "";
  }
  async deleteComment() {
    if (!this.isAuthrized()) {
      this.snackBarError("please login");
      this.router.navigate(['/Login']);
    }
    (await this.commentService.Delete(this.Commnet.id)).subscribe(data => {
      this.snackBarSuccess(data.message);
      this.Ondeleted.emit(this.Commnet);
    }, err => {
      this.snackBarError(err.error.message);
    });
  }
  showSubComment() {
    this.Subvisible = true;
  }
  async EditeSubComment() {
    if (this.commentText == this.Commnet.text) {
      this.snackBarError("its same the old ");
      return;
    }
    if (!this.isAuthrized()) {
      this.snackBarError("please login");
      this.router.navigate(['/Login']);
    }
    (await this.commentService.Update(this.Commnet.id, this.commentText)).subscribe(data => {
      this.Commnet = data.data;
      this.snackBarSuccess(data.message);
    }, err => {
      this.snackBarError(err.error.message);
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
      this.snackBarError("please login");
      this.router.navigate(['Login']);
    }
  }
  async Like() {
    (await this.likeService.LikeComment(this.Commnet.id)).subscribe(data => {
      this.liked = data.data;
      this.gettotalikes();
      this.LikeEnablebutton = true;
      this.snackBarSuccess(data.message);
    }, err => {
      this.snackBarError(err.error.message);
      this.LikeEnablebutton = true;
    });
  }

  async unLike() {
    (await this.likeService.UnLikeComment(this.Commnet.id)).subscribe(data => {
      this.liked = !data.data;
      this.snackBarSuccess(data.message);
      this.LikeEnablebutton = true;
      this.gettotalikes();
    }, err => {
      this.snackBarError(err.error.message);
      this.LikeEnablebutton = true;
    });
  }

  snackBarError(message: string) {
    this.snackBar.open(message, 'close', {
      duration: 2000,
      panelClass: ['red-snackbar'],
      horizontalPosition: 'start',
      verticalPosition: 'bottom',
    });
  }
  snackBarSuccess(message: string) {
    this.snackBar.open(message, 'close', {
      duration: 2000,
      panelClass: ['green-snackbar'],
      horizontalPosition: 'start',
      verticalPosition: 'bottom',
    });
  }
}
