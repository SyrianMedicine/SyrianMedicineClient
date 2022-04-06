import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { ReserveDateWithDoctorOrNurseComponent } from 'src/app/Common/reservesDate/reserve-date-with-doctor-or-nurse/reserve-date-with-doctor-or-nurse.component';
import { NurseInfo } from 'src/app/Models/Nurse/NurseInfo';
import { FollowService } from 'src/app/Services/Follow/follow.service';
import { NurseService } from 'src/app/Services/nurse/nurse.service';

@Component({
  selector: 'app-nurse-profile',
  templateUrl: './nurse-profile.component.html',
  styleUrls: ['./nurse-profile.component.scss']
})
export class NurseProfileComponent implements OnInit {

  nurseInfoData: NurseInfo = new NurseInfo();
  userName: string | any;
  startWorkTime: string | any;
  endWorkTime: string | any;
  iFollowedThisUser: boolean = false;

  constructor(
    private nurseService: NurseService,
    private dialog: MatDialog,
    private followService: FollowService,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute) { }

  async ngOnInit(): Promise<void> {
    this.userName = this.route.snapshot.paramMap.get("userName");
    (await this.nurseService.getNurseInfo(this.userName)).subscribe(data => {
      this.nurseInfoData = data;
      this.startWorkTime = this.nurseInfoData.startTimeWork.toString().substring(11);
      this.endWorkTime = this.nurseInfoData.endTimeWork.toString().substring(11);
    });

    await (await this.followService.isFollowedByMe(this.userName)).subscribe(data => {
      this.iFollowedThisUser = data.data;
    })
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
