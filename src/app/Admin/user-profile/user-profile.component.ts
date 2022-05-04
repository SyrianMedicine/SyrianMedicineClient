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
  constructor(private fb:FormBuilder , private accounServices: AccountService,
    private dialog :MatDialog, private snackBar: MatSnackBar) {}

  ngOnInit(): void {

    this.adminForm=this.fb.group({

      'adminName':['',[Validators.required]],
      'adminEmail':['',[Validators.required]]
    });
  }

  // async update() {

  // }
  // snackBarSuccess(message: string) {
  //   this.snackBar.open(message, 'close', {
  //     duration: 2000,
  //     panelClass: ['green-snackbar'],
  //     horizontalPosition: 'start',
  //     verticalPosition: 'bottom',
  //   });
  // }
  // snackBarError(message: string) {
  //   this.snackBar.open(message, 'close', {
  //     duration: 2000,
  //     panelClass: ['red-snackbar'],
  //     horizontalPosition: 'start',
  //     verticalPosition: 'bottom',
  //   });
  // }

  async onSubmit(event:any){

    let userNameExist = false;
    let emailExist  = false;
    let emailNotValid = this.checkIfStringIsVaildEmail(event.target.admin_email.value) == true ? false : true;

    var respnseUserNameExist = await (await this.accounServices.isUserNameExist(event.target.admin_Name.value)).toPromise();
    if (respnseUserNameExist) {
      userNameExist = respnseUserNameExist.valueOf();
    }

    var responseEmailExist = await (await (this.accounServices.isEmailExist(event.target.admin_email.value))).toPromise();
    if (responseEmailExist) {
      emailExist = responseEmailExist;
    }
    if (emailExist || userNameExist ||  emailNotValid)
      await this.openDialog(userNameExist, emailExist, emailNotValid);

      console.log(userNameExist + ' ' +emailExist +' ' + emailNotValid);

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


