import { Component, DoCheck, Input, OnChanges, OnInit, SimpleChanges, } from '@angular/core'; 
import { CommentOutput } from 'src/app/Models/Comment/CommentOutput';
import { PostService } from 'src/app/Services/post/post.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit,OnChanges {
  @Input() Commnet!:CommentOutput;
  SubCommnets!:Array<CommentOutput>;
  constructor(private postservce: PostService) { }

  ngOnInit(): void {   
  } 
ngOnChanges(changes: SimpleChanges): void {
  
  this.loadSubcomment(); 
}
  async loadSubcomment(): Promise<void> {
    (await this.postservce.GetSubComments(this.Commnet.id,1,3)).subscribe(da => {
      this.SubCommnets=da.items; 
    }, err => {});
    }

}
