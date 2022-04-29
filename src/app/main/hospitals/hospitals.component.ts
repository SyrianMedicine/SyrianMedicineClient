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
  pageSize: number = 3;
  totalItems!: number;
  hospitalInfo!: Array<HospitalInfo>;
  isLoading: boolean = false;
  constructor(private hospitalService: HospitalService) {
  }

  ngOnInit(): void {
    this.getPageHospital()
  }

  async getPageHospital() {
    this.isLoading = true;
    (await this.hospitalService.getHospitalsPagination(this.PageNumber, this.pageSize)).subscribe(response => {
      this.hospitalInfo = response.items;
      this.totalItems = response.totalItems;
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
  movePage(page: number) {
    this.PageNumber = page;
    this.getPageHospital();
  }

}
