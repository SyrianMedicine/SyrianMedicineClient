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
  constructor(private nurseService: NurseService) { }
  isLoading: boolean = false;
  ngOnInit(): void {
    this.getPagePagination();
  }

  async getPagePagination(): Promise<void> {
    this.isLoading = true;
    (await this.nurseService.getNursePagination(this.pageNumber, this.pageSize,this.workAtHome,
      this.searchString,this.startTimeWork,this.endTimeWork,this.gender)).subscribe(response => {
      this.nursesInfo = response.items;
      this.totalItems = response.totalItems;
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

    value  = value.toLowerCase();

    let malePattern = /(male|ma|mal|males)/i
    let femalePattern=/(fe|fem|fema|femal|female|females)/i
    let workAtHomePattern=/(work|at home|external work|work external|external)/i
    let notWorkAtHomePattern=/(not work at home|not external work|not external |internal )/i

    if(value.match(malePattern)){
      this.gender=1;
    }
    else if(value.match(femalePattern)){
      this.gender=2;
    }
    else if(value.match(workAtHomePattern)){
      this.workAtHome=true;
    }
    else if(value.match(notWorkAtHomePattern)){
      this.workAtHome=false;
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
