import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { HospitalreserveComponent } from 'src/app/Common/reservesDate/HospitalReserve/hospitalreserve/hospitalreserve.component';
import { AddPostSectionComponent } from 'src/app/Component/add-post-section/add-post-section.component';
import { DynamicPagination } from 'src/app/Models/Helper/DynamicPagination';
import { HospitalInfo } from 'src/app/Models/Hospital/HospitalInfo';
import { AccountService } from 'src/app/Services/Account/account.service';
import { FollowService } from 'src/app/Services/Follow/follow.service';
import { HospitalService } from 'src/app/Services/hospital/hospital.service';
import { postsLoadeFactory } from 'src/app/Services/post/postsLoadeFactory';

@Component({
  selector: 'app-hospital-profile',
  templateUrl: './hospital-profile.component.html',
  styleUrls: ['./hospital-profile.component.scss']
})
export class HospitalProfileComponent implements OnInit {

  hospitalInfoData: HospitalInfo = new HospitalInfo();
  userName: string | any;
  hospitalId: number = 0;
  iFollowedThisUser: boolean = false;
  profilepostLoadfunc!:(page:DynamicPagination)=> Promise<Observable<any>>;
  

  constructor(
    private hospitalService: HospitalService,
    private followService: FollowService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private accountService:AccountService) { 
      this.profilepostLoadfunc=postsLoadeFactory.getProfileLoadMethod(accountService,this.route.snapshot.paramMap.get("userName"));
 
    }
    openAddPost(){
      let dialogRef= this.dialog.open(AddPostSectionComponent,{
        width:'280px'
      })
    }
  async ngOnInit(): Promise<void> {
    this.userName = this.route.snapshot.paramMap.get("userName");
    (await this.hospitalService.getHospitalInfo(this.userName)).subscribe(data => {
      this.hospitalInfoData = data;
      this.hospitalId = data.id;
    })

    await (await this.followService.isFollowedByMe(this.userName)).subscribe(data =>{
      this.iFollowedThisUser =data.data;
      console.log("asd: " +data.data);
    })

  }

  openTemplete(templete: any) {
    this.dialog.open(templete, {
      width: '300px'
    });
  }

  openReserveDialog() {
    let username = this.userName;
    let hospitalIdentifier = this.hospitalId;
    let dialogRef = this.dialog.open(HospitalreserveComponent, {
      width: '250px',
      data: {
        username,
        hospitalIdentifier
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
