import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from 'src/app/Services/Account/account.service';
import { NurseService } from 'src/app/Services/nurse/nurse.service';

@Component({
  selector: 'app-update-nurse',
  templateUrl: './update-nurse.component.html',
  styleUrls: ['./update-nurse.component.scss']
})
export class UpdateNurseComponent implements OnInit {
  nurseFrom!:FormGroup
  cities:any;
  psersonStates:any;
  constructor(private fb:FormBuilder,private accountService:AccountService) {}

 async ngOnInit():Promise <void> {
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
  });

    this.getCities();
    this.getPersonStates();
  }

  getCities(){
    this.accountService.getCities().subscribe(response => {
      this.cities =response
      console.log(this.cities)
    })
  }
  getPersonStates(){
    this.accountService.getStates().subscribe(response =>{
      this.psersonStates= response
      console.log(this.psersonStates);
    })
  }
}
