import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-reserve-date-with-doctor-or-nurse',
  templateUrl: './reserve-date-with-doctor-or-nurse.component.html',
  styleUrls: ['./reserve-date-with-doctor-or-nurse.component.scss']
})
export class ReserveDateWithDoctorOrNurseComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ReserveDateWithDoctorOrNurseComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }
  ngOnInit(): void {
  }

  onSubmitReserve(ev :any){
    
  }

}
