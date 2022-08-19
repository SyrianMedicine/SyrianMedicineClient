import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { end } from '@popperjs/core';
import { Subscription } from 'rxjs';
import { DoctorInfo } from 'src/app/Models/Doctor/DoctorInfo';
import { DoctorProfileComponent } from 'src/app/profiles/doctor-profile/doctor-profile.component';
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
  doctorName:any;
  doctorId!:Number
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
    this.doctorName=this.doctorService.getValue();
    (await this.doctorService.getDoctorInfo(this.doctorName)).subscribe(response =>{
      this.doctorId = response.id;
      console.log(this.doctorId)
    })

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

    let firstName=event.target.firstNameInput.value;
    let lastName=event.target.lastNameInput.value;
    let phone = event.target.phoneNumberInput.value;
    let aboutMe =event.target.aboutMeInput.value;
    let specialization =event.target.specializationInput.value;
    let workAtHome =event.target.selectWorkAthome.value;
    let startTimeWork = event.target.startDatetimeInput.value;
    let endTimeWork =event.target.endDatetimeInput.value;
    let location =event.target.locationInput.value;
    let state =event.target.selectPersonStates.value;
    let homeNumber =event.target.homeNumberInput.value;
    let city =event.target.selectCityInput.value;

      let workAtHomeResult =true;

      if(workAtHome.value == 1){
        workAtHomeResult=true
      }
      else{
        workAtHomeResult=false
      }
      let id = this.doctorId

      console.log(id,firstName,lastName,phone,specialization,state,location,
        aboutMe,workAtHome,startTimeWork,endTimeWork,homeNumber,city)

  let result =await this.doctorService.updateDoctorInfo(id,firstName,lastName,phone,aboutMe,specialization,workAtHomeResult,
      startTimeWork,endTimeWork,location,state,homeNumber,city)
      result.subscribe(response=>{
        console.log(response.message)
        // alert(response.message)
      })


  }
}
