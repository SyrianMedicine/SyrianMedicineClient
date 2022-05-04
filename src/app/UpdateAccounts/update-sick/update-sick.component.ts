import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SickService } from 'src/app/Services/sick/sick.service';

@Component({
  selector: 'app-update-sick',
  templateUrl: './update-sick.component.html',
  styleUrls: ['./update-sick.component.scss']
})
export class UpdateSickComponent implements OnInit {
  sickForm!:FormGroup
  cities:any;
  constructor(private fb:FormBuilder,private sickService:SickService) {}

 async ngOnInit():Promise <void> {
    this.sickForm=this.fb.group({
      'firstNameInput':['',[Validators.required]],
      'lastNameInput':['',[Validators.required]],
      'phoneNumberInput':['',[Validators.required]],
      'homeNumberInput':['',[Validators.required]],
      'locationInput':['',[Validators.required]],
    });

    this.getCities()
  }

  getCities(){
    this.sickService.getCities().subscribe(response =>{
      this.cities= response
    })
  }
}
