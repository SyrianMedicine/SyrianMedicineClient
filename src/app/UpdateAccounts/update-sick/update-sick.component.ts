import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-sick',
  templateUrl: './update-sick.component.html',
  styleUrls: ['./update-sick.component.scss']
})
export class UpdateSickComponent implements OnInit {
  sickForm!:FormGroup

  constructor(private fb:FormBuilder) {
    this.sickForm=this.fb.group({
      'firstNameInput':['',[Validators.required]],
      'lastNameInput':['',[Validators.required]],
      'phoneNumberInput':['',[Validators.required]],
      'homeNumberInput':['',[Validators.required]],
      'locationInput':['',[Validators.required]],
    })
   }

  ngOnInit(): void {
  }

}
