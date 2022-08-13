import { Component, OnInit } from '@angular/core';
import { NurseInfo } from 'src/app/Models/Nurse/NurseInfo';
import { NurseService } from 'src/app/Services/nurse/nurse.service';
@Component({
  selector: 'app-nurses',
  templateUrl: './nurses.component.html',
  styleUrls: ['./nurses.component.scss']
})
export class NursesComponent implements OnInit {
  workAtHome!:boolean;
  searchString!:string;
  startTimeWork!:string
  endTimeWork!:string
  gender!:Number;
  pageNumber: number = 1;
  pageSize: number = 5;
  totalItems!: number;
  nursesInfo!: Array<NurseInfo>
  isLoading: boolean = false;
  searchEmpty:string=''
  constructor(private nurseService: NurseService) { }
  ngOnInit(): void {
    this.getPagePagination();
  }

  async getPagePagination(): Promise<void> {
    this.isLoading = true;
    (await this.nurseService.getNursePagination(this.pageNumber, this.pageSize,this.workAtHome,
      this.searchString,this.startTimeWork,this.endTimeWork,this.gender)).subscribe(response => {
        this.nursesInfo = response.items;
        this.totalItems = response.totalItems;
        if(this.nursesInfo.length==0){
          this.searchEmpty='Not found Results Please Try Agin....';
        }
        else{
        this.searchEmpty=''
        }
      for (let i = 0; i < this.nursesInfo.length; i++) {
        if (this.nursesInfo[i].pictureUrl == null) {
          this.nursesInfo[i].pictureUrl = "assets/images/no-image.png";
        }
      }
      this.isLoading = false;
    }, er => {
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
    let malePattern = /(male|ma|mal|males)/gi
    let femalePattern=/(fe|fem|fema|femal|female|females)/gi
    let workAtHomePattern=/(work|at home|external work|work external|external)/gi
    let startTimeWorkPattern=/(from \d{2}:\d{2})/gi
    let endTimeWorkPattern=/(to \d{2}:\d{2}|- \d{2}:\d{2})/gi
    if(value.match(malePattern)){
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
      this.searchString=value;
    }
    this.getPagePagination()
}

  movePage(page: number) {
    this.pageNumber = page;
    this.getPagePagination();
  }
}
