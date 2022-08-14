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
  constructor(private fb:FormBuilder,private accountService:AccountService,
    private nuresService:NurseService) {}

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


  let result = await this.nuresService.updateNurseInfo(firstName,lastName,phone,aboutMe,specialization,workAtHome,
      startTimeWork,endTimeWork,location,state,homeNumber,city)
      result.subscribe(response=>{
        if(response.data===false){
          alert("Please Try Agin ...")
        }
        alert(response.message)
      })
  }
}
