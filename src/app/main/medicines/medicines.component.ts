import { HttpClient } from '@angular/common/http';
import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { DoctorService } from 'src/app/Services/doctor/doctor.service';
@Component({
  selector: 'app-medicines',
  templateUrl: './medicines.component.html',
  styleUrls: ['./medicines.component.scss']
})
export class MedicinesComponent implements OnInit {

  doctorsInfo: any;
  PageNumber:any=2;
  pageSize:any=3;
  totalItems:any;
  totalPages:any;
  items :any[]=[];

  constructor(private docotrService:DoctorService) {}

  async ngOnInit():Promise<void> {
      await (await this.docotrService.getDoctorsPagination(this.PageNumber,this.pageSize)).subscribe(data => {
              this.doctorsInfo=data;
              this.items=this.doctorsInfo.items
              this.totalItems=this.doctorsInfo.totalItems
              this.totalPages=this.doctorsInfo.totalPages;
              for(let i=0;i<this.doctorsInfo.length; i++){
              if(this.doctorsInfo[i].pictureUrl === null)
                this.doctorsInfo[i].pictureUrl= "assets/images/no-image.png";
              if(this.doctorsInfo.aboutMe.length > 44 )
                this.doctorsInfo.aboutMe = this.doctorsInfo.aboutMe.substring(0,44) + '......';
              } // end  for loop ...

      }); //end of subscribe()

  } // end of ngOnInit()

}
