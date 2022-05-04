import { ChangeDetectorRef, Component, HostListener, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { DynamicPagination } from 'src/app/Models/Helper/DynamicPagination';
import { PaginationOutput } from 'src/app/Models/Helper/PaginationOutput';
import { PostOutput } from 'src/app/Models/Post/PostOutput';
import { SyrianMedSnakBarService } from 'src/app/Services/SyrianMedSnakBar/syrian-med-snak-bar.service';

@Component({
  selector: 'app-posts-section',
  templateUrl: './posts-section.component.html',
  styleUrls: ['./posts-section.component.scss']
})
export class PostsSectionComponent implements OnInit {

  @Input() loadefunc!:(page: DynamicPagination) => Promise<Observable<any>>;
  Paginationout: PaginationOutput = new PaginationOutput(3);
  isLoding: boolean = false;
  postended: boolean = false;
  posts: Array<PostOutput> = new Array<PostOutput>();
  constructor(private changeDetectorRef: ChangeDetectorRef, private snackBar: SyrianMedSnakBarService) {
  }
  addNewPost(item:PostOutput){
    if(item!=null){ 
      this.posts.unshift(item);
      this.changeDetectorRef.detectChanges();
    }
  }
  ngOnInit(): void {
    this.isLoding = true;
    this.loadpost();
  }
  async loadpost(): Promise<void> {
    this.isLoding = true;
    (await this.loadefunc(this.Paginationout.getNextDynamicPaginationObject())).subscribe(data => {
      for (let index = 0; index < data.items.length; index++) {
        this.posts.push(data.items[index]);
      }
      this.Paginationout.update(data);
      this.isLoding = false;
      this.postended = this.Paginationout.isEnded();
      this.changeDetectorRef.detectChanges();
    }, err => {

      this.isLoding = false;
    });
  }
 

  @HostListener("window:scroll", ["$event"])
  onWindowScroll() {
    //In chrome and some browser scroll is given to body tag
    let pos = (document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.offsetHeight;
    let max = document.documentElement.scrollHeight;
    let distance = max - pos;
    if (distance <= 220) {
      if (!this.postended && !this.isLoding && !this.Paginationout.isEnded()) {
        this.loadpost();
      }
    }
  }
}
