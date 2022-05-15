import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { DynamicPagination } from 'src/app/Models/Helper/DynamicPagination';
import { PaginationOutput } from 'src/app/Models/Helper/PaginationOutput';
import { usercard } from 'src/app/Models/usercard/usercard';
import{LikeService}from 'src/app/Services/Like/like.service'

@Component({
  selector: 'app-likes',
  templateUrl: './likes.component.html',
  styleUrls: ['./likes.component.scss']
})
export class LikesComponent implements OnInit {
  users:Array<usercard>=new Array<usercard>();
  Id!:number; 
  isLoding: boolean = false;
  Ended: boolean = false;
  pagination: PaginationOutput = new PaginationOutput(5);
  LoadMethod!:(id: number,Pagination:DynamicPagination)=>Promise<Observable<any>>;
  constructor(private changeDetectorRef: ChangeDetectorRef,@Inject(MAT_DIALOG_DATA) public data: any, public dialog:MatDialogRef<LikesComponent>,LikeSer:LikeService) { 
    this.LoadMethod=LikeSer.getLoadLikesMethod(data["type"]);
    this.Id=data["Id"];
  }
  ngOnInit(): void {
    this.loadLiks();
  }
  async loadLiks(): Promise<void> {
    this.isLoding = true;
    (await this.LoadMethod(this.Id, this.pagination.getNextDynamicPaginationObject())).subscribe(data => {
      for (let index = 0; index < data.items.length; index++) {
        this.users.push(data.items[index].user);
      }
      this.pagination.update(data);
      this.Ended = this.pagination.isEnded();
      this.isLoding = false;
      this.changeDetectorRef.detectChanges();
    }, err => {
      this.isLoding = false;
    });
  }
  close(){
    this.dialog.close();
  }
  showMore(){
    this.loadLiks();
  }

}
