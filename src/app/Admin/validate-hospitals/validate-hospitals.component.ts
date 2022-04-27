import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogMessageComponent } from 'src/app/doctor-reverse/dialog-message/dialog-message.component';
import { RejectDialogComponent } from 'src/app/doctor-reverse/reject-dialog/reject-dialog.component';

@Component({
  selector: 'app-validate-hospitals',
  templateUrl: './validate-hospitals.component.html',
  styleUrls: ['./validate-hospitals.component.scss']
})
export class ValidateHospitalsComponent implements OnInit {

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
   dataSource = ELEMENT_DATA;

}
export interface Element {
  id:number,
  name: string;
  email:string,
  date:string,
  phone:string
}

const ELEMENT_DATA: Element[] = [
  {id: 1,phone:'0964827090' , name: 'Hydrogen',date:'11-2-2022 10:00AM', email:'Hydrogen.Helium@gmail.com' },
  {id: 2,phone:'0964827090', name: 'Helium',date:'11-2-2022 10:00AM',email:'Hydrogen.Helium@gmail.com'  },
  {id: 3,phone:'0964827090', name: 'Lithium',date:'11-2-2022 10:00AM' ,email:'Hydrogen.Helium@gmail.com'},
  {id: 4,phone:'0964827090', name: 'Beryllium', date:'11-2-2022 10:00AM',email:'Hydrogen.Helium@gmail.com' },
  {id: 5,phone:'0964827090', name: 'Boron', date:'11-2-2022 10:00AM',email:'Hydrogen.Helium@gmail.com'},
  {id: 6,phone:'12345566', name: 'Boron', date:'11-2-2022 10:00AM',email:'Hydrogen.Helium@gmail.com'},
  {id: 7,phone:'12345566', name: 'Boron', date:'11-2-2022 10:00AM',email:'Hydrogen.Helium@gmail.com'}
];
