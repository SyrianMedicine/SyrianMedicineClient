import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CommentOutput } from 'src/app/Models/Comment/CommentOutput';
import { PaginationOutput } from 'src/app/Models/Helper/PaginationOutput';
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
  @Input() post!: PostOutput;
  Commnets: Array<CommentOutput> = new Array<CommentOutput>();
  liked: boolean = false;
  numberofLike: number = 0;
  isLoding: boolean = false;
  displayCom: boolean = true;
  displayCancel: Boolean = true;
  newComment!: string;
  isNewCommentCreateing: Boolean = false;
  LikeEnablebutton: boolean = false;
  CommentsEnded: Boolean = false;
  ///////////////////////////////////////
  pagination: PaginationOutput = new PaginationOutput(3);
  ///////////////////////////////////////
  constructor(private changeDetectorRef: ChangeDetectorRef, private router: Router, private likeService: LikeService, private postservce: PostService, private Commentservice: CommentService, private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.loadcomment();
    this.gettotalikes();
    this.getMylikeStatus();

  }
  async gettotalikes() {
    (await this.postservce.GettotalLike(this.post.id)).subscribe(data => {
      this.numberofLike = data.data;
    }, err => { });
  }
  async getMylikeStatus() {

    if (this.isAuthrized()) {
      this.LikeEnablebutton = false;
      (await this.likeService.IsPostliked(this.post.id)).subscribe(data => {
        this.liked = data.data;
        this.LikeEnablebutton = true;
      }, err => {
        this.LikeEnablebutton = true;
      });
    } else
      this.LikeEnablebutton = true;
  }

  async loadcomment(): Promise<void> {
    if (!this.CommentsEnded && !this.isLoding) {
      this.isLoding = true;
      (await this.postservce.GetComments(this.post.id, this.pagination.getNextDynamicPaginationObject())).subscribe(data => {
        for (let index = 0; index < data.items.length; index++) {
          this.Commnets.push(data.items[index]);
        }
        this.pagination.update(data);
        this.CommentsEnded = this.pagination.isEnded();
        this.isLoding = false;
        this.changeDetectorRef.detectChanges();
      }, err => {
        this.isLoding = false;
      });
    }
  }
  isAuthrized(): Boolean {
    return localStorage.getItem('token') != null;
  }
  ChildeDeleted(ChildeCommnet: CommentOutput) {
    for (let index = 0; index < this.Commnets.length; index++) {
      if (this.Commnets[index].id == ChildeCommnet.id) {
        this.Commnets.splice(index, 1);
      }
    }
    this.changeDetectorRef.detectChanges(); 
  }
  isOwnedbyMe(): Boolean {
    let username = localStorage.getItem("username");
    if (username == null)
      return false
    return username.toLowerCase() == this.post.user.userName.toLowerCase();
  }
  async CreateComment() {
    if (!this.isAuthrized()) {
      this.snackBarError("please login");
      this.router.navigate(['/Login']);
    }
    this.isNewCommentCreateing = true;
    (await this.Commentservice.CreatePostComment(this.post.id, this.newComment)).subscribe(data => {
      this.Commnets.unshift(data.data);
      this.snackBarSuccess(data.message);
      this.changeDetectorRef.detectChanges();
      this.isNewCommentCreateing = false;
    }, err => {
      this.isNewCommentCreateing = false;
      this.snackBarError(err.error.message);
    });
    this.newComment = "";
  }

  displayComment() {

    this.displayCom = false;
    this.displayCancel = false;
  }
  cancelComment() {
    this.displayCancel = true;
    this.displayCom = true;
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
  async Like() {
    (await this.likeService.Likepost(this.post.id)).subscribe(data => {
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
    (await this.likeService.UnLikepost(this.post.id)).subscribe(data => {
      this.liked = !data.data;
      this.snackBarSuccess(data.message); 
      this.LikeEnablebutton = true;
      this.gettotalikes();
    }, err => {
      this.snackBarError(err.error.message);
      this.LikeEnablebutton = true;
    });
  }
}
