import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from 'src/app/Services/Account/account.service';
import { SickService } from 'src/app/Services/sick/sick.service';

@Component({
  selector: 'app-update-sick',
  templateUrl: './update-sick.component.html',
  styleUrls: ['./update-sick.component.scss']
})
export class UpdateSickComponent implements OnInit {
  sickForm!:FormGroup
  cities:any;
  constructor(private fb:FormBuilder,private accountService:AccountService) {}

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
    this.accountService.getCities().subscribe(response =>{
      this.cities= response
    })
  }
}
