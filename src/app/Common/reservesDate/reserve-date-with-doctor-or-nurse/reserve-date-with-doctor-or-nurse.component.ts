import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { ReserveDoctorOrNurse } from 'src/app/Models/Reserve/ReserveDoctorOrNurse/ReserveDoctorOrNurse';
import { DoctorService } from 'src/app/Services/doctor/doctor.service';
import { NurseService } from 'src/app/Services/nurse/nurse.service';
import { ReserveDoctorOrNurseService } from 'src/app/Services/Reserve/reserve-doctor-or-nurse.service';

@Component({
  selector: 'app-reserve-date-with-doctor-or-nurse',
  templateUrl: './reserve-date-with-doctor-or-nurse.component.html',
  styleUrls: ['./reserve-date-with-doctor-or-nurse.component.scss']
})
export class ReserveDateWithDoctorOrNurseComponent implements OnInit {

  reserveForm = this.formBuilder.group({
    titleInput: ['', Validators.required],
    descriptionInput: ['', Validators.required],
    datetimeInput: ['', Validators.required],
  });
  type = 0;
  id = 0;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    public dialogRef: MatDialogRef<ReserveDateWithDoctorOrNurseComponent>,
    private doctorService: DoctorService,
    private nurseService: NurseService,
    private reserveDateWithDoctorOrNurseService: ReserveDoctorOrNurseService,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  async ngOnInit(): Promise<void> {
    console.log("ee: " + this.data.username);
    (await this.doctorService.getDoctorInfo(this.data.username)).subscribe(data => {
      if (data != null) {
        this.id = data.id;
        this.type = 1;
      }
    });

    if (this.type != 1) {
      (await this.nurseService.getNurseInfo(this.data.username)).subscribe(data => {
        if (data != null) {
          this.id = data.id;
          this.type = 2;
        }
      });
    }
  }

  async onSubmitReserve(ev: any) {
    console.log("type:" + this.type)
    if (this.type == 1) {
      var data: ReserveDoctorOrNurse = new ReserveDoctorOrNurse();

      data.title = ev.target.titleInput.value;
      data.description = ev.target.descriptionInput.value;
      data.timeReverse = ev.target.datetimeInput.value;
      data.doctorId = +this.id;

      (await this.reserveDateWithDoctorOrNurseService.ReserveDate(data)).subscribe(data => {
        this.snackBar.open(data.message, 'close', {
          duration: 3000,
          horizontalPosition: 'start',
          verticalPosition: 'bottom',
        });
      }, err => {
        this.snackBar.open(err, 'close', {
          duration: 3000,
          horizontalPosition: 'start',
          verticalPosition: 'bottom',
        });
      })
    }
  }

}
