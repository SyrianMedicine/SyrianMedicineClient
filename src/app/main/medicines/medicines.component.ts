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
  doctorsInfo!:Array<DoctorInfo>;

  constructor(private docotrService:DoctorService) {}

   ngOnInit():void {
      this.getPageDoctors();
}

  getPageDoctors(){
        this.docotrService.getDoctorsPagination(this.PageNumber,this.pageSize).subscribe(response =>{
          this.doctorsInfo = response.items;
          this.totalItems=response.totalItems;
          for(let i=0 ;i <this.doctorsInfo.length ;i++){
            if(this.doctorsInfo[i].pictureUrl == null){
              this.doctorsInfo[i].pictureUrl="assets/images/no-image.png"
            }}});
      }
  onMovePage(page:any){
    this.PageNumber=page;
    this.getPageDoctors();
    }

}
