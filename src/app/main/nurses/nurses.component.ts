import { Component, OnInit } from '@angular/core';
import { NurseInfo } from 'src/app/Models/Nurse/NurseInfo';
import { NurseService } from 'src/app/Services/nurse/nurse.service';
@Component({
  selector: 'app-nurses',
  templateUrl: './nurses.component.html',
  styleUrls: ['./nurses.component.scss']
})
export class NursesComponent implements OnInit {

  pageNumber: number = 1;
  pageSize: number = 3;
  totalItems!: number;
  nursesInfo!: Array<NurseInfo>
  constructor(private nurseService: NurseService) { }
  isLoading: boolean = false;
  ngOnInit(): void {
    this.getPagePagination();
  }

  async getPagePagination(): Promise<void> {
    this.isLoading = true;
    (await this.nurseService.getNursePagination(this.pageNumber, this.pageSize)).subscribe(response => {
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

  movePage(page: number) {
    this.pageNumber = page;
    this.getPagePagination();
  }
}
