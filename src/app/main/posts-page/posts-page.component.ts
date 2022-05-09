import { ChangeDetectorRef, Component, HostListener, OnInit } from '@angular/core'; 
import { async } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar'; 
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DynamicPagination } from 'src/app/Models/Helper/DynamicPagination'; 
import { PostOutput } from 'src/app/Models/Post/PostOutput';
import { PostService } from 'src/app/Services/post/post.service';
import { postsLoadeFactory } from 'src/app/Services/post/postsLoadeFactory';

@Component({
  selector: 'app-posts-page',
  templateUrl: './posts-page.component.html',
  styleUrls: ['./posts-page.component.scss']
})
export class PostsPageComponent implements OnInit {
  postLoadfunc!:(page:DynamicPagination)=> Promise<Observable<any>>;

  post!:PostOutput;
  id!:number;
  constructor(private postservce: PostService,private snackBar:MatSnackBar,private Route:ActivatedRoute) {
    this.postLoadfunc=postsLoadeFactory.getHomePostLoadMethod(postservce);

  }
 async getPost(){
    (await this.postservce.GetPost(this.id)).subscribe(v=>{
      this.post=v.data;
    });
  }
  
  ngOnInit(): void {
    this.Route.queryParams.subscribe(v=>{ 
      this.id=v['id'];
      if(this.id)
      this.getPost();
    }
    );
  } 

}
