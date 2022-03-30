import { HttpClient } from '@angular/common/http';
import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { DoctorInfo } from 'src/app/Models/Doctor/DoctorInfo';

import { DoctorService } from 'src/app/Services/doctor/doctor.service';
@Component({
  selector: 'app-medicines',
  templateUrl: './medicines.component.html',
  styleUrls: ['./medicines.component.scss']
})
export class MedicinesComponent implements OnInit {

  PageNumber:number=1;
  pageSize:number=3;
  totalItems!:number;
  doctorsItems!:Array<DoctorInfo>;

  constructor(private docotrService:DoctorService) {}

   ngOnInit():void {
      this.getPageDoctors(this.PageNumber);
}

  getPageDoctors(PageNumebr:Number){
        this.docotrService.getDoctorsPagination(this.PageNumber,this.pageSize).subscribe(response =>{
          this.doctorsItems = response.items;

  console.log(response.items)
          this.totalItems=response.totalItems;
     },err=>{ console.log("error")});
}
onMovePage(page:any){
  this.PageNumber=page;
  this.getPageDoctors(this.PageNumber);
  console.log(this.PageNumber)
}
}
