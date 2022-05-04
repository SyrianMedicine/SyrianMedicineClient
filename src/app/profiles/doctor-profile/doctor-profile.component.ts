import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ReserveDateWithDoctorOrNurseComponent } from 'src/app/Common/reservesDate/reserve-date-with-doctor-or-nurse/reserve-date-with-doctor-or-nurse.component';
import { AddPostSectionComponent } from 'src/app/Component/add-post-section/add-post-section.component';
import { DoctorInfo } from 'src/app/Models/Doctor/DoctorInfo';
import { DynamicPagination } from 'src/app/Models/Helper/DynamicPagination';
import { AccountService } from 'src/app/Services/Account/account.service';
import { DoctorService } from 'src/app/Services/doctor/doctor.service';
import { FollowService } from 'src/app/Services/Follow/follow.service';
import { postsLoadeFactory } from 'src/app/Services/post/postsLoadeFactory';
import { PostsSectionComponent } from 'src/app/Component/posts-section/posts-section.component';
import { PostOutput } from 'src/app/Models/Post/PostOutput';

@Component({
  selector: 'app-doctor-profile',
  templateUrl: './doctor-profile.component.html',
  styleUrls: ['./doctor-profile.component.scss']
})
export class DoctorProfileComponent implements OnInit {

  doctorInfoData: DoctorInfo = new DoctorInfo();
  @ViewChild("PostsSection") postSection!:PostsSectionComponent; 
  userName: string | any;
  startWorkTime: string | any;
  endWorkTime: string | any;
  iFollowedThisUser: boolean = false;
  profilepostLoadfunc!:(page:DynamicPagination)=> Promise<Observable<any>>;
  constructor(
    private doctorService: DoctorService,
    private dialog: MatDialog,
    private followService: FollowService,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private accountService:AccountService) {
      this.profilepostLoadfunc=postsLoadeFactory.getProfileLoadMethod(accountService,this.route.snapshot.paramMap.get("userName"));
  }
 
  async ngOnInit(): Promise<void> {
    this.userName = this.route.snapshot.paramMap.get("userName");
    (await this.doctorService.getDoctorInfo(this.userName)).subscribe(data => {
      this.doctorInfoData = data;
      this.startWorkTime = this.doctorInfoData.startTimeWork.toString().substring(11);
      this.endWorkTime = this.doctorInfoData.endTimeWork.toString().substring(11);
    });
  }

  openTemplete(templete: any) {
    this.dialog.open(templete, {
      width: '300px'
    });
  } 

  openReserveDialog() {
    let username = this.userName;
    let dialogRef = this.dialog.open(ReserveDateWithDoctorOrNurseComponent, {
      width: '250px',
      data: {
        username
      }
    });
  }

  openAddPost(){
    let dialogRef= this.dialog.open(AddPostSectionComponent,{
      width:'280px'
    })
    dialogRef.componentInstance.onPostAdded.subscribe((data:PostOutput) => {
     if(this.postSection!=null){
        console.log(data);
        
        this.postSection.addNewPost(data);
      }
    });
  }
  isMyOwnProfile() {
    return localStorage.getItem("username") == this.userName;
  }

  async followUser() {
    (await this.followService.followUser(this.userName)).subscribe(data => {
      this.iFollowedThisUser = true;
      this.snackBar.open(data.message, 'close', {
        duration: 5000,
        horizontalPosition: 'start',
        verticalPosition: 'bottom',
      });
    }, err => {
      this.snackBar.open(err, 'close', {
        duration: 5000,
        horizontalPosition: 'start',
        verticalPosition: 'bottom',
      });
    });

  }
  async unFollowUser() {
    (await this.followService.unFollowUser(this.userName)).subscribe(data => {
      this.iFollowedThisUser = false;
      this.snackBar.open(data.message, 'close', {
        duration: 5000,
        horizontalPosition: 'start',
        verticalPosition: 'bottom',
      });
    }, err => {
      this.snackBar.open(err.message, 'close', {
        duration: 5000,
        horizontalPosition: 'start',
        verticalPosition: 'bottom',
      });
    });
  }

}
