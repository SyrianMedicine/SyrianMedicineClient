import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from 'src/app/Services/Account/account.service';
import { DoctorService } from 'src/app/Services/doctor/doctor.service';

@Component({
  selector: 'app-update-doctor',
  templateUrl: './update-doctor.component.html',
  styleUrls: ['./update-doctor.component.scss']
})
export class UpdateDoctorComponent implements OnInit {
  Doctorform!:FormGroup;
  cities!:Array<any>;
  personStates!:Array<any>
  constructor(private fb :FormBuilder,private accountService:AccountService,
    private doctorService:DoctorService) {}

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
      this.cities=response;
    });
  }
  getPesronStates(){
    return  this.accountService.getStates().subscribe (response => {
      this.personStates=response
    });
  }
 async onSubmit(event:any){
    let firstName=event.target.firstNameInput;
    let lastName=event.target.lastNameInput;
    let phone = event.target.phoneNumberInput;
    let aboutMe =event.target.aboutMeInput;
    let specialization =event.target.specializationInput;
    let workAtHome =event.target.selectWorkAthome;
    let startTimeWork = event.target.startDatetimeInput;
    let endTimeWork =event.target.endDatetimeInput;
    let location =event.target.locationInput;
    let state =event.target.selectPersonStates;
    let homeNumber =event.target.homeNumberInput;
    let city =event.target.city;


  let result = await this.doctorService.updateDoctorInfo(firstName,lastName,phone,aboutMe,specialization,workAtHome,
      startTimeWork,endTimeWork,location,state,homeNumber,city)
      result.subscribe(response=>{
        alert(response.message)
      })
  }
}
