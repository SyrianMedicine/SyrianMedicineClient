import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { async } from 'rxjs';
import { AccountService } from '../Services/Account/account.service';

@Component({
  selector: 'app-update-passowrd',
  templateUrl: './update-passowrd.component.html',
  styleUrls: ['./update-passowrd.component.scss']
})
export class UpdatePassowrdComponent implements OnInit {
  hide = true;
  passwordForm!: FormGroup
  isUopdating: Boolean = false
  oldPassword!: string
  newPassword!: string
  constructor(private fb: FormBuilder, private accounServices: AccountService,private snackBar: MatSnackBar) {
    this.passwordForm = this.fb.group({
      'oldPassword': ['', [Validators.required]],
      'newPassword': ['', [Validators.required]]
    })
  }

  ngOnInit(): void {

  }

  async ChangePassword() {
    this.isUopdating = true;

    console.log(this.oldPassword);

    console.log(this.newPassword);
    (await this.accounServices.ChangePassword(this.oldPassword, this.newPassword)).subscribe(data => {
      this.isUopdating = false;
      this.snackBarSuccess(data);
    }, err => {
      console.log(err); 
      this.snackBarError(err.error.text);
      this.isUopdating = false;
    });
  }
  snackBarSuccess(message: string) {
    this.snackBar.open(message, 'close', {
      duration: 2000,
      panelClass: ['green-snackbar'],
      horizontalPosition: 'start',
      verticalPosition: 'bottom',
    });
  }
  snackBarError(message: string) { 
    this.snackBar.open(message, 'close', {
      duration: 2000,
      panelClass: ['red-snackbar'],
      horizontalPosition: 'start',
      verticalPosition: 'bottom',
    });
  }

}
