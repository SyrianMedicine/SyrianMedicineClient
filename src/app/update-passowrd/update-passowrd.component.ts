import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { async } from 'rxjs';
import { OthersComponent } from '../Admin/others/others.component';
import { RegisterDialogComponent } from '../register/dialogs/registerDialog/register-dialog/register-dialog.component';
import { AccountService } from '../Services/Account/account.service';
import { SyrianMedSnakBarService } from '../Services/SyrianMedSnakBar/syrian-med-snak-bar.service';

@Component({
  selector: 'app-update-passowrd',
  templateUrl: './update-passowrd.component.html',
  styleUrls: ['./update-passowrd.component.scss']
})
export class UpdatePassowrdComponent implements OnInit {
  hide = true;
  passwordForm!: FormGroup
  isUopdating: Boolean = false 
  constructor(private fb: FormBuilder, private dialog:MatDialog ,private accounServices: AccountService,private snackBar: SyrianMedSnakBarService) {}

  ngOnInit(): void {
    this.passwordForm = this.fb.group({
      'oldPassword': ['', [Validators.required]],
      'newPassword': ['', [Validators.required]]
    });

  }

   async ChangePassword(newpass:string,old:string) {
    this.isUopdating = true; 
    (await this.accounServices.ChangePassword(old, newpass)).subscribe(data => {
      this.snackBar.openSuccess(data);
      this.isUopdating = false;
    }, err => { 
      this.snackBar.openError(err.error.text);
      this.isUopdating = false;
    });
   }
 

  async onSubmit(event:any){

    let passwordNotHaveUpperCaseCharachter = this.checkIfStringHaveAtLeastOneUppercase(event.target.newPassword.value) == true ? false : true;
    let passwordNotHaveLoweCaseCharachter = this.checkIfStringHaveAtLeastOneLowercase(event.target.newPassword.value) == true ? false : true;
    let passwordNotHaveValidLength = this.checkIfStringHaveMinimumLengthGood(event.target.newPassword.value, 8) == true ? false : true;
    let passwordNotHaveAtLeastOneNumber = this.checkIfStringHaveAtLeastOneDigit(event.target.newPassword.value) == true ? false : true;
    let passwordNotHaveAtLeastOneSpeical = this.chechIfStringHasAtLeastOneSpeicalCharcter(event.target.newPassword.value) == true ? false : true;

    if (passwordNotHaveUpperCaseCharachter || passwordNotHaveAtLeastOneSpeical || passwordNotHaveLoweCaseCharachter
          || passwordNotHaveValidLength || passwordNotHaveAtLeastOneNumber){
      await this.openDialog(passwordNotHaveUpperCaseCharachter, passwordNotHaveLoweCaseCharachter,
        passwordNotHaveValidLength, passwordNotHaveAtLeastOneNumber, passwordNotHaveAtLeastOneSpeical)
      }else
      {
        console.log("dsa");
        
        this.ChangePassword(event.target.newPassword.value as string,event.target.oldPassword.value as string);
      }
  }

  checkIfStringHaveAtLeastOneDigit(s: string) {
    const regexToCheck = /(?=.*[0-9])/;
    return regexToCheck.test(s);
  }

  checkIfStringHaveAtLeastOneLowercase(s: string) {
    const regexToCheck = /(?=.*[a-z])/;
    return regexToCheck.test(s);
  }

  checkIfStringHaveAtLeastOneUppercase(s: string) {
    const regexToCheck = /(?=.*[A-Z])/;
    return regexToCheck.test(s);
  }

  chechIfStringHasAtLeastOneSpeicalCharcter(s: string) {
    const regexToCheck = /(?=.*\W)/;
    return regexToCheck.test(s);
  }

  checkIfStringHaveMinimumLengthGood(s: string, n: any) {
    return s.length >= n;
  }

  async openDialog(passwordNotHaveUpperCaseCharachter: boolean, passwordNotHaveLoweCaseCharachter: boolean,
    passwordNotHaveValidLength: boolean, passwordNotHaveAtLeastOneNumber: boolean, passwordNotHaveAtLeastOneSpeical: boolean) {
    let dialogRef = this.dialog.open(RegisterDialogComponent, {
      width: '250px',
      data: {
        passwordNotHaveUpperCaseCharachter: passwordNotHaveUpperCaseCharachter,
        passwordNotHaveLoweCaseCharachter: passwordNotHaveLoweCaseCharachter,
        passwordNotHaveValidLength: passwordNotHaveValidLength,
        passwordNotHaveAtLeastOneNumber: passwordNotHaveAtLeastOneNumber,
        passwordNotHaveAtLeastOneSpeical: passwordNotHaveAtLeastOneSpeical,
      }
    });
  }

}
