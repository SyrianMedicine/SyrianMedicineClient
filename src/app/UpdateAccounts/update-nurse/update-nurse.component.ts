import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from 'src/app/Services/Account/account.service';
import { DoctorService } from 'src/app/Services/doctor/doctor.service';
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
  userName:any
  nurseId:any
  constructor(private fb:FormBuilder,private accountService:AccountService,
    private nuresService:NurseService, private doctorService:DoctorService) {}

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
    this.userName = this.nuresService.getValue()
    console.log(this.userName);
    (await this.nuresService.getNurseInfo(this.userName)).subscribe(response =>{
      this.nurseId =response.id
      console.log(this.nurseId)
    })

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

    let firstName=event.target.firstNameInput.value;
    let lastName=event.target.lastNameInput.value;
    let phone = event.target.phoneNumberInput.value;
    let aboutMe =event.target.aboutMeInput.value;
    let specialization =event.target.specializationInput.value;
    let workAtHome =event.target.selectWorkAthome.value;
    let startTimeWork = event.target.startDatetimeInput.value;
    let endTimeWork =event.target.endDatetimeInput.value;
    let location =event.target.locationInput.value;
    let state =event.target.selectPersonStateInput.value;
    let homeNumber =event.target.homeNumberInput.value;
    let city =event.target.selectCityInput.value;
    let id = this.nurseId;

    let workAtHomeResult =true;

      if(workAtHome.value == 1){
        workAtHomeResult=true
      }
      else{
        workAtHomeResult=false
      }

      if(id == undefined){
        alert ("I'm soory can't update Info ,please return to new Login..")
      }
      else {
          let result = await this.nuresService.updateNurseInfo(id,firstName,lastName,phone,aboutMe,specialization,workAtHomeResult,
          startTimeWork,endTimeWork,location,state,city,homeNumber)
          result.subscribe(response=>{
          if(response.data===false){
          alert("Please Try Agin ...")
        }
          alert(response.message)
        })
  }}
}
