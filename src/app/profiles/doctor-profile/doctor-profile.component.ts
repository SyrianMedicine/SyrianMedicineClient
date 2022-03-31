import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ReserveDateWithDoctorOrNurseComponent } from 'src/app/Common/reservesDate/reserve-date-with-doctor-or-nurse/reserve-date-with-doctor-or-nurse.component';
import { DoctorInfo } from 'src/app/Models/Doctor/DoctorInfo';
import { DoctorService } from 'src/app/Services/doctor/doctor.service';

@Component({
  selector: 'app-doctor-profile',
  templateUrl: './doctor-profile.component.html',
  styleUrls: ['./doctor-profile.component.scss']
})
export class DoctorProfileComponent implements OnInit {

  doctorInfoData: DoctorInfo = new DoctorInfo();
  userName: string | any;
  startWorkTime: string | any;
  endWorkTime: string | any;

  constructor(private doctorService: DoctorService, private dialog: MatDialog, private route: ActivatedRoute) {
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
    let dialogRef = this.dialog.open(ReserveDateWithDoctorOrNurseComponent, {
      width: '250px',
      data: {
        type: 1,
      }
    });
  }

}
