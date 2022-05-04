import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { AddPostSectionComponent } from 'src/app/Component/add-post-section/add-post-section.component';
import { PostsSectionComponent } from 'src/app/Component/posts-section/posts-section.component';
import { DynamicPagination } from 'src/app/Models/Helper/DynamicPagination';
import { PostOutput } from 'src/app/Models/Post/PostOutput';
import { SickInfo } from 'src/app/Models/Sick/SickInfo';
import { AccountService } from 'src/app/Services/Account/account.service';
import { postsLoadeFactory } from 'src/app/Services/post/postsLoadeFactory';
import { SickService } from 'src/app/Services/sick/sick.service';

@Component({
  selector: 'app-sick-profile',
  templateUrl: './sick-profile.component.html',
  styleUrls: ['./sick-profile.component.scss']
})
export class SickProfileComponent implements OnInit {

  userName: string | any;
  sickInfoData: SickInfo = new SickInfo();
  profilepostLoadfunc!:(page:DynamicPagination)=> Promise<Observable<any>>;
  @ViewChild("PostsSection") postSection!:PostsSectionComponent; 
  constructor(private sickService: SickService, private dialog: MatDialog, private route: ActivatedRoute ,private accountService:AccountService) {
    this.profilepostLoadfunc=postsLoadeFactory.getProfileLoadMethod(accountService,this.route.snapshot.paramMap.get("userName"));
  }

  async ngOnInit(): Promise<void> {
    this.userName = this.route.snapshot.paramMap.get("userName");
    (await this.sickService.getSickInfo(this.userName)).subscribe(data => {
      this.sickInfoData = data;
      console.log(data);
    });
  }
  isMyOwnProfile() {
    return localStorage.getItem("username") == this.userName;
  }
  openTemplete(templete: any) {
    this.dialog.open(templete, {
      width: '300px'
    });
  }

  addPostButton(){
   let dialogRef= this.dialog.open(AddPostSectionComponent,{
      width:'300px'
    });
    dialogRef.componentInstance.onPostAdded.subscribe((data:PostOutput) => {
      if(this.postSection!=null){
         console.log(data);
         
         this.postSection.addNewPost(data);
       }
     });
  }
}
