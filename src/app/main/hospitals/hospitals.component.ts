import { Component, OnInit } from '@angular/core';
import { async } from '@angular/core/testing';
import { HospitalInfo } from 'src/app/Models/Hospital/HospitalInfo';
import { HospitalService } from 'src/app/Services/hospital/hospital.service';
@Component({
  selector: 'app-hospitals',
  templateUrl: './hospitals.component.html',
  styleUrls: ['./hospitals.component.scss']
})

export class HospitalsComponent implements OnInit {
  PageNumber: number = 1;
  pageSize: number = 5;
  searchString!:string;
  departmentName!:string
  hasAvialbaleBed!:boolean
  totalItems!: number;
  hospitalInfo!: Array<HospitalInfo>;
  isLoading: boolean = false;
  searchEmpty:string=''
  constructor(private hospitalService: HospitalService) {
  }

  ngOnInit(): void {
    this.getPageHospital()
  }

  async getPageHospital() {
    this.isLoading = true;
    (await this.hospitalService.getHospitalsPagination(this.PageNumber, this.pageSize,this.searchString,
      this.departmentName,this.hasAvialbaleBed)).subscribe(response => {
      this.hospitalInfo = response.items;
      this.totalItems = response.totalItems;
      if(this.hospitalInfo.length==0){
        this.searchEmpty='Not found Results Please Try Agin....';
      }
      else{
      this.searchEmpty=''
      }

      for (let i = 0; i < this.hospitalInfo.length; i++) {
        if (this.hospitalInfo[i].pictureUrl == null) {
          this.hospitalInfo[i].pictureUrl = "assets/images/no-image.png"
        }
      }
      this.isLoading=false;
    },err=>{
      this.isLoading=true;
    }
    );
  }
  FilterData(value:string){

    let hasAvailableBedPattern= /(has available bed|has available beds|available bed|available beds|has beds|beds|bed)/i
    let departmentNamePattern1 =/(department|Urology|Sexual Health|Rheumatology|Renal|Radiotherapy|Radiology|Physiotherapy|Otolaryngology|orthopaedics|Ophthalmology|Oncology)/i
    let departmentNamePattern2 =/(department|Obstetrics|Gynecology|Nutrition|Dietetics|Neurology|Nephrology|Neonatal|Microbiology|Maternity|Diagnostic|Imaging|Elderly Services)/i

    if(value.toLowerCase().match(hasAvailableBedPattern)){
     this.hasAvialbaleBed=true;
    }
    else if(value.toLowerCase().match(departmentNamePattern1)|| value.match(departmentNamePattern2)){
      this.departmentName = value;
    }
    else{
      this.searchString=value;
    }
    this.getPageHospital();
  }
  movePage(page: number) {
    this.PageNumber = page;
    this.getPageHospital();
  }
}
