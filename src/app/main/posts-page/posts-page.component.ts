import { ChangeDetectorRef, Component, HostListener, OnInit } from '@angular/core'; 
import { MatSnackBar } from '@angular/material/snack-bar'; 
import { Observable } from 'rxjs';
import { DynamicPagination } from 'src/app/Models/Helper/DynamicPagination'; 
import { PostService } from 'src/app/Services/post/post.service';
import { postsLoadeFactory } from 'src/app/Services/post/postsLoadeFactory';

@Component({
  selector: 'app-posts-page',
  templateUrl: './posts-page.component.html',
  styleUrls: ['./posts-page.component.scss']
})
export class PostsPageComponent implements OnInit {
  postLoadfunc!:(page:DynamicPagination)=> Promise<Observable<any>>;

  constructor(private postservce: PostService,private snackBar:MatSnackBar) {
    this.postLoadfunc=postsLoadeFactory.getHomePostLoadMethod(postservce);
  }
 
  ngOnInit(): void {
  }
 

  snackBarError(message:string){
    this.snackBar.open(message, 'close', {
      duration: 2000,
      panelClass:['red-snackbar'],
      horizontalPosition: 'start',
      verticalPosition: 'bottom',
    });
  }
  snackBarSuccess(message:string){
    this.snackBar.open(message, 'close', {
      duration: 2000,
      panelClass:['green-snackbar'],
      horizontalPosition: 'start',
      verticalPosition: 'bottom',
    });
  }
}
