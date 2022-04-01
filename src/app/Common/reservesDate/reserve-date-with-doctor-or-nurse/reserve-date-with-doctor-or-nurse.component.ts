import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
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

    if (this.type == 1) {
      let data = {
        title: ev.target.titleInput.value,
        description: ev.target.descriptionInput.value,
        timeReverse: ev.target.datetimeInput.value,
        doctorId: +this.id,
      };
      (await this.reserveDateWithDoctorOrNurseService.ReserveDate(data, this.type)).subscribe(data => {
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
      })
    }
    else if (this.type == 2) {
      let data = {
        title: ev.target.titleInput.value,
        description: ev.target.descriptionInput.value,
        timeReverse: ev.target.datetimeInput.value,
        nurseId: +this.id,
      };
      (await this.reserveDateWithDoctorOrNurseService.ReserveDate(data, this.type)).subscribe(data => {
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
      })
    }
  }

}
