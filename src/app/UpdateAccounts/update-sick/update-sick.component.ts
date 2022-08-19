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
  userName:any;
  constructor(private fb:FormBuilder,private accountService:AccountService,
    private sickService:SickService) {}

 async ngOnInit():Promise <void> {
    this.sickForm=this.fb.group({
      'firstNameInput':['',[Validators.required]],
      'lastNameInput':['',[Validators.required]],
      'phoneNumberInput':['',[Validators.required]],
      'homeNumberInput':['',[Validators.required]],
      'locationInput':['',[Validators.required]],
    });

    this.getCities()
    this.userName = this.sickService.getValue();
    console.log(this.userName)
  }

  getCities(){
    this.accountService.getCities().subscribe(response =>{
      this.cities= response
    })
  }

  async onSubmit(event:any){

    let firstName = event.target.firstNameInput.value;
    let lastName = event.target.lastNameInput.value;
    let phone =event.target.phoneNumberInput.value;
    let homeNumber = event.target.homeNumberInput.value;
    let gender = event.target.selectGender.value;
    let location =event.target.locationInput.value;
    let selectState = event.target.selectState.value;
    let city = event.target.selectCityInput.value;

    let result =await this.sickService.updateSick(firstName,lastName,phone,homeNumber,gender,location,selectState,city)
      result.subscribe(response=>{
        if(response.data === false){
          alert("Please try Agin .....")
        }
         alert(response.message)
      });
  }
}
