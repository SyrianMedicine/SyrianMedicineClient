import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-nurse',
  templateUrl: './update-nurse.component.html',
  styleUrls: ['./update-nurse.component.scss']
})
export class UpdateNurseComponent implements OnInit {
  nurseFrom!:FormGroup
  constructor(private fb:FormBuilder) {
    this.nurseFrom =this.fb.group({
      'firstNameInput':["",[Validators.required]],
      'lastNameInput':["",[Validators.required]],
      'phoneNumberInput':["",[Validators.required]],
      'homeNumberInput':["",[Validators.required]],
      'specializationInput':["",[Validators.required]],
      'locationInput':["",[Validators.required]],
      'aboutMeInput':["",[Validators.required]],
      'startDatetimeInput':["",[Validators.required]],
      'endDatetimeInput':["",[Validators.required]]
    })
   }

  ngOnInit(): void {
  }

}
