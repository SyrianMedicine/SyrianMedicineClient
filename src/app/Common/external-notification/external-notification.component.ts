import { Component, Inject, OnInit } from '@angular/core';
import { inject } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { usercard } from 'src/app/Models/usercard/usercard';

@Component({
  selector: 'app-external-notification',
  templateUrl: './external-notification.component.html',
  styleUrls: ['./external-notification.component.scss']
})
export class ExternalNotificationComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data:any,public dialog:MatDialogRef<ExternalNotificationComponent>) { 
   }  
  ngOnInit(): void { 
     
  }
 

}
