import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { CommentOutput } from 'src/app/Models/Comment/CommentOutput';
import { PaginationOutput } from 'src/app/Models/Helper/PaginationOutput';
import { AccountService } from 'src/app/Services/Account/account.service';

@Component({
  selector: 'app-profile-comment-section',
  templateUrl: './profile-comment-section.component.html',
  styleUrls: ['./profile-comment-section.component.scss']
})
export class ProfileCommentSectionComponent implements OnInit {
  username:string|any;
  Paginationout: PaginationOutput = new PaginationOutput(3);
  isLoding: boolean = false;
  CommentEnded: boolean = false;
  Comments: Array<CommentOutput> = new Array<CommentOutput>();
  constructor(private Accoutservices:AccountService,private route: ActivatedRoute,private changeDetectorRef: ChangeDetectorRef) {
    this.username=this.route.snapshot.paramMap.get("userName")
  }

  ngOnInit(): void {
    this.isLoding = true;
    this.loadComment();
  }
  async loadComment(): Promise<void> {
    this.isLoding = true;
    (await this.Accoutservices.getProfileComment(this.username,this.Paginationout.getNextDynamicPaginationObject())).subscribe(data => {
      for (let index = 0; index < data.items.length; index++) {
        this.Comments.push(data.items[index]);
      }
      this.Paginationout.update(data);
      this.isLoding = false;
      this.CommentEnded = this.Paginationout.isEnded();
      this.changeDetectorRef.detectChanges();
    }, err => {

      this.isLoding = false;
    });
  }
 
 
  showMore() {
      if(!this.CommentEnded && !this.isLoding && !this.Paginationout.isEnded()) {
         this.loadComment();
      }
    
  }
  ChildeDeleted(ChildeCommnet: CommentOutput) {
    for (let index = 0; index < this.Comments.length; index++) {
      if (this.Comments[index].id == ChildeCommnet.id) {
        this.Comments.splice(index, 1);
      }
    }
    this.changeDetectorRef.detectChanges();
  }
}
