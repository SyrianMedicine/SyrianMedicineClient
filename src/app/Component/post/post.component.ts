import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, RouterStateSnapshot } from '@angular/router';
import { CommentOutput } from 'src/app/Models/Comment/CommentOutput';
import { PaginationOutput } from 'src/app/Models/Helper/PaginationOutput';
import { PostOutput } from 'src/app/Models/Post/PostOutput';
import { CommentService } from 'src/app/Services/Comment/comment.service';
import { LikeService } from 'src/app/Services/Like/like.service';
import { PostService } from 'src/app/Services/post/post.service';
import { SyrianMedSnakBarService } from 'src/app/Services/SyrianMedSnakBar/syrian-med-snak-bar.service';
import { LikesComponent } from '../Likes/likes/likes.component';

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
  constructor(private changeDetectorRef: ChangeDetectorRef,private dialog:MatDialog, private router: Router, private likeService: LikeService, private postservce: PostService, private Commentservice: CommentService, private snackBar: SyrianMedSnakBarService) {
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
  ShowLikes(){
    let dialogRef = this.dialog.open(LikesComponent, { 
      width: '450px',  
      panelClass:['Likesdilog'],
      
      data: {
        "type":"Post",
        "Id":this.post.id
      }
    });
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
      this.snackBar.openError("please login");
      this.router.navigate(['/Login'],{queryParams:{returnUrl:this.router.url}});
    }
    this.isNewCommentCreateing = true;
    (await this.Commentservice.CreatePostComment(this.post.id, this.newComment)).subscribe(data => {
      this.Commnets.unshift(data.data);
      this.snackBar.openSuccess(data.message);
      this.changeDetectorRef.detectChanges();
      this.isNewCommentCreateing = false;
    }, err => {
      this.isNewCommentCreateing = false;
      this.snackBar.openError(err.error.message);
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
      this.snackBar.openError("please login");
      this.router.navigate(['Login'],{queryParams:{returnUrl:this.router.url}});
    }
  }
 
  async Like() {
    (await this.likeService.Likepost(this.post.id)).subscribe(data => {
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
    (await this.likeService.UnLikepost(this.post.id)).subscribe(data => {
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
