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
    let malePattern = /(male|ma|mal|males)/i
    let femalePattern=/(fe|fem|fema|femal|female|females)/i
    let workAtHomePattern=/(work|at home|external work|work external|external)/i
    let notWorkAtHomePattern=/(not work at home|not external work|not external |internal )/i
    if(value.toLowerCase().match(malePattern)){
      this.gender=1;
    }
    else if(value.toLowerCase().match(femalePattern)){
      this.gender=2;
    }
    else if(value.toLowerCase().match(workAtHomePattern)){
      this.workAtHome=true;
    }
    else if(value.toLowerCase().match(notWorkAtHomePattern)){
      this.workAtHome=false;
    }
    else{
      this.searchString=value;
    }

    this.getPageDoctors()
}
  onMovePage(page: any) {
    this.PageNumber = page;
    this.getPageDoctors();
  }
}
