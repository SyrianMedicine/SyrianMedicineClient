import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { city } from 'src/app/Models/city';
import { HospitalService } from 'src/app/Services/hospital/hospital.service';

@Component({
  selector: 'app-update-hospital',
  templateUrl: './update-hospital.component.html',
  styleUrls: ['./update-hospital.component.scss']
})
export class UpdateHospitalComponent implements OnInit {
  hospitsalForm!:FormGroup
  cities:any;
  constructor( private fb:FormBuilder ,private hospitalService:HospitalService) {}

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
      this.hospitalService.getCities().subscribe(response =>{
        this.cities = response;
        console.log(this.cities)
      })
    }
}
