import { Component, OnInit } from '@angular/core';
import { DoctorInfo } from 'src/app/Models/Doctor/DoctorInfo';

import { DoctorService } from 'src/app/Services/doctor/doctor.service';
@Component({
  selector: 'app-medicines',
  templateUrl: './medicines.component.html',
  styleUrls: ['./medicines.component.scss']
})
export class MedicinesComponent implements OnInit {
  workAtHome!:boolean;
  searchString!:string;
  startTimeWork!:string
  endTimeWork!:string
  gender!:Number;
  PageNumber: number = 1;
  pageSize: number = 5;
  totalItems!: number;
  doctorsInfo!: Array<DoctorInfo>;
  searchEmpty!:string
  isLoading: boolean = false;
  constructor(private docotrService: DoctorService) { }

  ngOnInit(): void {
    this.getPageDoctors();
  }

  getPageDoctors() {
    this.isLoading = true;
    this.docotrService.getDoctorsPagination(this.PageNumber, this.pageSize,this.workAtHome,this.searchString,
      this.startTimeWork,this.endTimeWork,this.gender).subscribe(response => {
      this.doctorsInfo = response.items;
      if(this.doctorsInfo.length==0){
          this.searchEmpty='Not found Results Please Try Agin....';
      }
      else{
        this.searchEmpty=''
      }

      this.totalItems = response.totalItems;
      for (let i = 0; i < this.doctorsInfo.length; i++) {
        if (this.doctorsInfo[i].pictureUrl == null) {
          this.doctorsInfo[i].pictureUrl = "assets/images/no-image.png"
        }
      }
      this.isLoading = false;
    },err=>{
      this.isLoading = false;
    });
  }

  filterData(value:string){
    let date=new Date();
    let newFormatDate=date.toISOString();
    let dateWithOutTime=newFormatDate.substring(0,11);
    let endTime,startTime,postion;
    if(value.search('to')){
      postion = value.search('to');
      endTime = value.substring(postion + 2,value.length);
      startTime = value.substring(0,postion);
    }
    else if(value.search('-')){
      postion = value.search('-');
      endTime = value.substring(postion+2,value.length);
      startTime = value.substring(0,postion);
    }

    let malePattern = /(ma|mal|male|males)/gi
    let femalePattern=/(fe|fem|fema|femal|female|females)/gi
    let workAtHomePattern=/(work|at home|external work|work external|external)/gi
    let startTimeWorkPattern=/(\d{2}:\d{2})/gi
    let endTimeWorkPattern=/(to \d{2}:\d{2}|- \d{2}:\d{2})/gi
    if(value.toLowerCase().match(malePattern)){
      this.gender=1;
    }
    else if(value.toLowerCase().match(femalePattern)){
      this.gender=2;
    }
    else if(value.toLowerCase().match(workAtHomePattern)){
      this.workAtHome=true;
    }
    else if(value.toLowerCase().match(endTimeWorkPattern)){
      this.startTimeWork=dateWithOutTime + startTime;
      this.endTimeWork=dateWithOutTime + endTime;
    }
    else if(value.toLowerCase().match(startTimeWorkPattern)){
      this.startTimeWork=dateWithOutTime+value;
    }
    else{
      if(value.length===0){
        this.searchString!;
      }
      this.searchString = value;
    }
    this.getPageDoctors();
}
  onMovePage(page: any) {
    this.PageNumber = page;
    this.getPageDoctors();
  }
}
