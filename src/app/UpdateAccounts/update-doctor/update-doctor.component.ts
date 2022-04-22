import { validateVerticalPosition } from '@angular/cdk/overlay';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-doctor',
  templateUrl: './update-doctor.component.html',
  styleUrls: ['./update-doctor.component.scss']
})
export class UpdateDoctorComponent implements OnInit {
  Doctorform!:FormGroup;
  constructor(private fb :FormBuilder) {
    this.Doctorform = this.fb.group({
      'firstNameInput' :['',[Validators.required]],
      'lastNameInput': ['',[Validators.required]],
      'phoneNumberInput':['',[Validators.required]],
      'homeNumberInput':['',[Validators.required]],
      'specializationInput':['',[Validators.required]],
      'locationInput': ['',[Validators.required]],
      'aboutMeInput' :['',Validators.required],
      'startDatetimeInput': ['',[Validators.required]],
      'endDatetimeInput' :['',[Validators.required]]
    })
   }

  ngOnInit(): void {
  }

}
