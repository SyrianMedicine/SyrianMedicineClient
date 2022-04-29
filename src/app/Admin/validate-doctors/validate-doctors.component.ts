import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogMessageComponent } from 'src/app/doctor-reverse/dialog-message/dialog-message.component';
import { RejectDialogComponent } from 'src/app/doctor-reverse/reject-dialog/reject-dialog.component';

@Component({
  selector: 'app-validate-doctors',
  templateUrl: './validate-doctors.component.html',
  styleUrls: ['./validate-doctors.component.scss']
})
export class ValidateDoctorsComponent implements OnInit {

  constructor(public dialog:MatDialog) { }

  ngOnInit(): void {
  }
  openAccept(){
    this.dialog.open(DialogMessageComponent) 
    
  }
  openReject(){
    this.dialog.open(RejectDialogComponent)
  }
  displayedColumns = ['id', 'name', 'email' ,'phone', 'date','download','accept','reject'];
   dataSource =  new Array<Element>();
}
export interface Element {
  id:number,
  name: string;
  email:string,
  date:string,
  phone:string,
  Documents:string
  
}
