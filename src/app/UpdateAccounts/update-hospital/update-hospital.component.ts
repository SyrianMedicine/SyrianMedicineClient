import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { city } from 'src/app/Models/city';
import { HospitalInfo } from 'src/app/Models/Hospital/HospitalInfo';
import { DoctorProfileComponent } from 'src/app/profiles/doctor-profile/doctor-profile.component';
import { AccountService } from 'src/app/Services/Account/account.service';
import { HospitalService } from 'src/app/Services/hospital/hospital.service';

@Component({
  selector: 'app-update-hospital',
  templateUrl: './update-hospital.component.html',
  styleUrls: ['./update-hospital.component.scss']
})
export class UpdateHospitalComponent implements OnInit {
  hospitsalForm!:FormGroup
  cities:any;
  userName:any
  hospitalId!:Number
  hospitalInfoData!:Array<HospitalInfo>
  @ViewChild(DoctorProfileComponent) child!:DoctorProfileComponent;
  constructor( private fb:FormBuilder ,private accountService:AccountService,
    private hospitalService:HospitalService) {}



 async ngOnInit():Promise <void> {
    this.hospitsalForm=this.fb.group({
      'nameInput':['',Validators.required],
      'webSiteInput':['',[Validators.required]],
      'phoneNumberInput':['',[Validators.required]],
      'homeNumberInput':['',[Validators.required]],
      'locationInput':['',[Validators.required]],
      'aboutHospitalInput':['',[Validators.required]],
    });
    this.getCities();
    this.userName=this.hospitalService.getValue();
    console.log(this.userName);
    (await this.hospitalService.getHospitalInfo(this.userName)).subscribe(data => {
      this.hospitalInfoData = data;
      this.hospitalId = data.id;
    })
  }
    getCities(){
      this.accountService.getCities().subscribe(response =>{
        this.cities = response;
        console.log(this.cities)
      })
    }

  async  onSubmit(event:any){
        let name = event.target.nameInput.value;
        let location=event.target.locationInput.value;
        let aboutHospital = event.target.aboutHospitalInput.value;
        let phoneNumer =event.target.phoneNumberInput.value;
        let homeNumber =event.target.homeNumberInput.value;
        let webSite =event.target.webSiteInput.value;
        let city =event.target.selectCityInput.value;


    // let id =this.hospitalId
    // let result = await this.hospitalService.updateHospitalInfo(id,name,location,aboutHospital,
    //   phoneNumer,homeNumber,webSite,city)

      // result.subscribe(response =>{
      //   console.log(response)
      // });
  }
}
