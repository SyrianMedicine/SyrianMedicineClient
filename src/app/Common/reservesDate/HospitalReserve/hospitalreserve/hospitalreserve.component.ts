import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { department } from 'src/app/Models/Hospital/Department/department';
import { HospitalService } from 'src/app/Services/hospital/hospital.service';
import { ReserveHospitalService } from 'src/app/Services/Reserve/reserve-hospital.service';

@Component({
  selector: 'app-hospitalreserve',
  templateUrl: './hospitalreserve.component.html',
  styleUrls: ['./hospitalreserve.component.scss']
})
export class HospitalreserveComponent implements OnInit {

  reserveForm = this.formBuilder.group({
    titleInput: ['', Validators.required],
    descriptionInput: ['', Validators.required],
  });

  departments: department[] = [];
  id: number = 0;


  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    public dialogRef: MatDialogRef<HospitalreserveComponent>,
    private snackBar: MatSnackBar,
    private hospitalService: HospitalService,
    private reserveHospital: ReserveHospitalService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  async ngOnInit(): Promise<void> {
    (await this.hospitalService.getDepartmentForHospital(this.data.username)).subscribe(data => {
      this.departments = data;
    });
  }

  selectOption(id: any) {
    this.id = id;
  }

  async onSubmitReserve(ev: any) {
    let body = {
      title: ev.target.titleInput.value,
      description: ev.target.descriptionInput.value,
      departmentId: +this.id,
      hospitalId: +this.data.hospitalIdentifier
    };


    (await this.reserveHospital.reserveHospital(body)).subscribe(data => {
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

}
