import { Component, Input, OnInit,  } from '@angular/core'; 
import { CommentOutput } from 'src/app/Models/Comment/CommentOutput'; 
import { CommentService } from 'src/app/Services/Comment/comment.service'; 

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {
  @Input() Commnet!:CommentOutput;
  SubCommnets!:Array<CommentOutput>;
  displayRep:boolean=true;
  displayCancel:boolean=true;
  commentText!:string; 
  //@Input() node:any;
  //user:usercard=new usercard();
  constructor(private commentService: CommentService) {  
  }
  ngOnInit(): void {
    this.loadSubcomment();
  } 
  async loadSubcomment(): Promise<void> {
    (await this.commentService.GetSubComments(this.Commnet.id,1,3)).subscribe(da => {
      this.SubCommnets=da.items;
    }, err => {});
    }
    async CreateSubComment(){ 
      (await this.commentService.CreateSubComment(this.Commnet.id,this.commentText)).subscribe(data => {
        this.SubCommnets.unshift(data.data);
        this.SubCommnets=this.SubCommnets;
        console.log(this.commentText);
      }, err => { console.log(this.commentText);
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
}
