import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogMessageComponent } from '../doctor-reverse/dialog-message/dialog-message.component';
import { RejectDialogComponent } from '../doctor-reverse/reject-dialog/reject-dialog.component';

@Component({
  selector: 'app-hospital-reverse',
  templateUrl: './hospital-reverse.component.html',
  styleUrls: ['./hospital-reverse.component.scss']
})
export class HospitalReverseComponent implements OnInit {

  constructor(public dialog:MatDialog) { }

  ngOnInit(): void {
  }
  openAccept() {
    this.dialog.open(DialogMessageComponent);
  }

  openReject() {
    this.dialog.open(RejectDialogComponent)
  }

  displayedColumns = ['id', 'name', 'email' ,'phone', 'date','department','title','details','status','accept','reject'];
  dataSource = ELEMENT_DATA;
}
export interface Element {
  id:number,
  name: string;
  email:string,
  phone:string,
  date:string,
  department:string
  title:string,
  details:string,
  status:string,
}

const ELEMENT_DATA: Element[] = [
  {id: 1,phone:'0964827090' , name: 'Hydrogen',date:'11-2-2022 10:00AM',department:'osseous',email:'Hydrogen@gmail.com' ,title:'title the sicken' , details: 'details the sicken',status:'Emergency'},
  {id: 2,phone:'12345566', name: 'Helium',date:'11-2-2022 10:00AM',department:'cosmestic',email:'Helium@gmail.com' ,title:'title the sicken' , details: 'details the sicken',status:'Surgery' },
  {id: 3,phone:'12345566', name: 'Lithium',date:'11-2-2022 10:00AM',department:'bra' ,email:'Helium@gmail.com' ,title:'title the sicken' , details: 'details the sicken',status:'Emergency'},
  {id: 4,phone:'12345566', name: 'Beryllium', date:'11-2-2022 10:00AM',department:'leather',email:'Helium@gmail.com' ,title:'title the sicken' , details: 'details the sicken',status:'Emergency'},
  {id: 5,phone:'12345566', name: 'Boron', date:'11-2-2022 10:00AM',department:'heart',email:'Helium@gmail.com' ,title:'title the sicken' , details: 'details the sicken',status:'Surgery'},
];
