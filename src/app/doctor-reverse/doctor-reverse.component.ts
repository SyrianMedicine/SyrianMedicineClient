import { Component,  OnInit } from '@angular/core';

@Component({
  selector: 'app-doctor-reverse',
  templateUrl: './doctor-reverse.component.html',
  styleUrls: ['./doctor-reverse.component.scss']
})
export class DoctorReverseComponent implements  OnInit{

  constructor(){}

   ngOnInit():void {

   }

   displayedColumns = ['id', 'name', 'email', 'date' ,'phone','title','details','status','accept','reject'];
   dataSource = ELEMENT_DATA;
}
export interface Element {
  id:number,
  name: string;
  email:string,
  title:string,
  details:string,
  status:string,
  date:string,
  phone:number
}

const ELEMENT_DATA: Element[] = [
  {id: 1,phone:12345566, name: 'Hydrogen',date:'11-2-2022 10:00AM', email:'Hydrogen@gmail.com' ,title:'title the sicken' , details: 'details the sicken',status:'review'},
  {id: 2,phone:12345566, name: 'Helium',date:'11-2-2022 10:00AM',email:'Helium@gmail.com' ,title:'title the sicken' , details: 'details the sicken',status:'review' },
  {id: 3,phone:12345566, name: 'Lithium',date:'11-2-2022 10:00AM' ,email:'Helium@gmail.com' ,title:'title the sicken' , details: 'details the sicken',status:'peview'},
  {id: 4,phone:12345566, name: 'Beryllium', date:'11-2-2022 10:00AM',email:'Helium@gmail.com' ,title:'title the sicken' , details: 'details the sicken',status:'review'},
  {id: 5,phone:12345566, name: 'Boron', date:'11-2-2022 10:00AM',email:'Helium@gmail.com' ,title:'title the sicken' , details: 'details the sicken',status:'peview'},
];