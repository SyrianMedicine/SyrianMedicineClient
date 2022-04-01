import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { department } from 'src/app/Models/Hospital/Department/department';
import { HospitalService } from 'src/app/Services/hospital/hospital.service';

@Component({
  selector: 'app-hospitalreserve',
  templateUrl: './hospitalreserve.component.html',
  styleUrls: ['./hospitalreserve.component.scss']
})
export class HospitalreserveComponent implements OnInit {

  reserveForm = this.formBuilder.group({
    titleInput: ['', Validators.required],
    descriptionInput: ['', Validators.required],
    datetimeInput: ['', Validators.required],
  });

  departments: department[] = [];


  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    public dialogRef: MatDialogRef<HospitalreserveComponent>,
    private snackBar: MatSnackBar,
    private hospitalService: HospitalService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  async ngOnInit(): Promise<void> {
    (await this.hospitalService.getDepartmentForHospital(this.data.username)).subscribe(data => {
      console.log("dd:"+data)
      this.departments = data;
    });
  }

  onSubmitReserve(ev: any) {

  }

}
