import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RegisterDialogComponent } from 'src/app/register/dialogs/registerDialog/register-dialog/register-dialog.component';
import { AccountService } from 'src/app/Services/Account/account.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  isUpdating:boolean=false
  hide = true;
  adminForm!:FormGroup;
  states!:Array<any>
  constructor(private fb:FormBuilder , private accounServices: AccountService,
    private dialog :MatDialog, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.getStates()
    this.adminForm=this.fb.group({

      'firstName':['',[Validators.required]],
      'lastName':['',[Validators.required]],
      'phone':['',[Validators.required]],
      'homeNumber':['',[Validators.required]],
      'gender':['',[Validators.required]],
      'location':['',[Validators.required]],
      'city':['',[Validators.required]]
    });
  }

  getStates(){
    this.accounServices.getStates().subscribe(respnose=>{
      this.states=respnose;
    })
  }

  async onSubmit(event:any){

    let firstName = event.target.firstName.value;
    let lastName = event.target.lastName.value;
    let phone =event.target.phone.value;
    let homeNumber = event.target.homeNumber.value;
    let gender = event.target.gender.value;
    let location =event.target.location.value;
    let selectState = event.target.selectState.value;
    let city = event.target.city.value;


    if(gender === 'male'){
      gender=1;
    }
    else if(gender === 'female'){
      gender=2;
    }

    let result =await this.submit(firstName,lastName,phone,homeNumber,gender,location,selectState,city)
      result.subscribe(response=>{
         alert(response.message)
      });

  }

  async submit(firstName:string,lastName:string,phoneNumber:string,homeNumber:string,
       gender:Number,location:string,selectState:Number,city:string){

       return  this.accounServices.updateAdminProfile(firstName,lastName,phoneNumber,
        homeNumber,gender,location,selectState,city)
  }

  async openDialog(userNameExist: boolean, emailExist: boolean, emailNotValid: boolean) {
    let dialogRef = this.dialog.open(RegisterDialogComponent, {
      width: '250px',
      data: {
        usernameExist: userNameExist,
        emailExist: emailExist,
        emailNotValid: emailNotValid
      }
    });
  }


  checkIfStringIsVaildEmail(s: string) {
    const regexToCheck = /(^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$)/;
    return regexToCheck.test(s);
  }


}


