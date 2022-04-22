import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-hospital',
  templateUrl: './update-hospital.component.html',
  styleUrls: ['./update-hospital.component.scss']
})
export class UpdateHospitalComponent implements OnInit {
  hospitsalForm!:FormGroup
  constructor( private fb:FormBuilder) {
    this.hospitsalForm=this.fb.group({
      'nameInput':['',Validators.required],
      'webSiteInput':['',[Validators.required]],
      'phoneNumberInput':['',[Validators.required]],
      'homeNumberInput':['',[Validators.required]],
      'locationInput':['',[Validators.required]],
      'aboutHospitalInput':['',[Validators.required]],
    })
   }

  ngOnInit(): void {
  }

}
