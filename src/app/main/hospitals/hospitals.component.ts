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

  PageNumber:number=1;
  pageSize:number=3;
  totalItems!:number;
  hospitalItems!:Array<HospitalInfo>;

  constructor(private hospitalService:HospitalService) {
   }

  ngOnInit(): void {
    this.getPageHospital()
  }

  async getPageHospital(){
    (await this.hospitalService.getHospitalsPagination(this.PageNumber,this.pageSize)).subscribe(response =>{
      this.hospitalItems = response.items;
      this.totalItems=response.totalItems;
      console.log(response)
 },err=>{ console.log("error")});
}
onMovePage(page:any){
    this.PageNumber=page;
    this.getPageHospital();
    console.log(this.PageNumber)
}

}
