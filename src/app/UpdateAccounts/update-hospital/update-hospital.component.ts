import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { city } from 'src/app/Models/city';
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
    this.getCities()
  }
    getCities(){
      this.accountService.getCities().subscribe(response =>{
        this.cities = response;
        console.log(this.cities)
      })
    }

  async  onSubmit(event:any){
        let name = event.target.nameInput;
        let location=event.target.locationInput;
        let aboutHospital = event.target.aboutHospitalInput;
        let phoneNumer =event.target.phoneNumberInput;
        let homeNumber =event.target.homeNumberInput;
        let webSite =event.target.webSiteInput;
        let city =event.target.selectCityInput;

    let result = await this.hospitalService.updateHospitalInfo(name,location,aboutHospital,
      phoneNumer,homeNumber,webSite,city)

      result.subscribe(response =>{
          if(response.data===false){
            alert("please Try Agin ....")
          }
          alert(response.message)
      });
  }
}
