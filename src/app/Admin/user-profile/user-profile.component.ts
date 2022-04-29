import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AccountService } from 'src/app/Services/Account/account.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  isUpdating:boolean=false
  hide = true; 
  constructor( private accounServices: AccountService,private snackBar: MatSnackBar) {
    
   }
  ngOnInit(): void {
  }
  async update() {
    
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
