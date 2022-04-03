import { ChangeDetectorRef, Component, HostListener, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { PostOutput } from 'src/app/Models/Post/PostOutput';
import { PostService } from 'src/app/Services/post/post.service';

@Component({
  selector: 'app-posts-page',
  templateUrl: './posts-page.component.html',
  styleUrls: ['./posts-page.component.scss']
})
export class PostsPageComponent implements OnInit {

  pageSize:number=3;
  pageNumber:number=1; 
  totalPages:number=-1;
  isLoding:boolean=false;   
  posts:Array<PostOutput>=new Array<PostOutput>(); 
 
  postended:boolean=false;

  constructor(private changeDetectorRef: ChangeDetectorRef,private route:Router,private postservce: PostService,private snackBar:MatSnackBar) {
   }
   isAuthrized():Boolean{
    return localStorage.getItem('token')!=null;
  }
  ngOnInit(): void {
    if(!this.isAuthrized())
    {
      this.snackBarError("please login");
      this.route.navigate(['/Login']);
    }
    this.loadpost();
  }
 async loadpost():Promise<void>{
    this.isLoding=true;
    (await this.postservce.getHomePost(this.pageNumber,this.pageSize)).subscribe(data => {
      for (let index = 0; index < data.items.length; index++) {
        this.posts.push(data.items[index]);
      }
      this.pageNumber=data.currentPage+1;
      this.totalPages=data.totalPages;
      this.isLoding=false;
      this.changeDetectorRef.detectChanges();

    }, err => {this.isLoding=false;

      console.log(this.isLoding);
    });
  }
  moveOn(){

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

@HostListener("window:scroll", ["$event"])
onWindowScroll() {
//In chrome and some browser scroll is given to body tag
let pos = (document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.offsetHeight;
let max = document.documentElement.scrollHeight;
 
 
 let distance= max-pos; 
if(distance<=260 )   { 
  if(this.totalPages!=(this.pageNumber-1)&&this.totalPages!=0&&!this.isLoding){  
    this.loadpost();
   }else this.postended=true;

 }
}
}
