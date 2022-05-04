import { validateVerticalPosition } from '@angular/cdk/overlay';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { city } from 'src/app/Models/city';
import { AccountService } from 'src/app/Services/Account/account.service';
import { DoctorService } from 'src/app/Services/doctor/doctor.service';

@Component({
  selector: 'app-update-doctor',
  templateUrl: './update-doctor.component.html',
  styleUrls: ['./update-doctor.component.scss']
})
export class UpdateDoctorComponent implements OnInit {
  Doctorform!:FormGroup;
  cities:any;
  personStates:any;
  constructor(private fb :FormBuilder,private accountService:AccountService) {}

 async ngOnInit():Promise <void> {
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
    });
    this.getCities();
    this.getPesronStates();
  }
  getCities(){
    return  this.accountService.getCities().subscribe (response => {
      this.cities=response
      console.log(this.cities);
    });
  }
  getPesronStates(){
    return  this.accountService.getStates().subscribe (response => {
      this.personStates=response
      console.log(this.personStates);
    });
  }
}
