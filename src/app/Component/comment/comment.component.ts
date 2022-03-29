import { Component, DoCheck, Input, OnChanges, OnInit, SimpleChanges, } from '@angular/core';
import { FormBuilder, FormControlName, FormGroup, Validators } from '@angular/forms';
import { CommentOutput } from 'src/app/Models/Comment/CommentOutput';
import { usercard } from 'src/app/Models/usercard/usercard';
import { PostService } from 'src/app/Services/post/post.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit,OnChanges {
  @Input() Commnet!:CommentOutput;
  @Input() node:any; 
  user:usercard=new usercard();
  SubCommnets!:Array<CommentOutput>;
  form:FormGroup;
  constructor(private postservce: PostService, private fb:FormBuilder) {
    this.form =this.fb.group({
      replay:['',[Validators.required]]
    })
   }
  ngOnInit(): void {

   this.user.displayName="sarya Tulimar";
  }
ngOnChanges(changes: SimpleChanges): void {
    // this.loadSubcomment();
}
  async loadSubcomment(): Promise<void> {
    (await this.postservce.GetSubComments(this.Commnet.id,1,3)).subscribe(da => {
      this.SubCommnets=da.items;
    }, err => {});
    } 
}