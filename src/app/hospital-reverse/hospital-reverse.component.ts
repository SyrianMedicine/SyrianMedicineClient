import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Reserve } from '../Models/Reserve/Reserve';
import { DialogMessageComponent } from '../reverse/dialog-message/dialog-message.component';
import { RejectDialogComponent } from '../reverse/reject-dialog/reject-dialog.component'; 
import { ReserveHospitalService } from '../Services/Reserve/reserve-hospital.service';
import { HospitalAproveComponent } from './hospital-aprove/hospital-aprove.component';
 
@Component({
  selector: 'app-hospital-reverse',
  templateUrl: './hospital-reverse.component.html',
  styleUrls: ['./hospital-reverse.component.scss']
})
export class HospitalReverseComponent implements OnInit {

  displayedColumns:Array<string>  = ['id', 'name', 'email' ,'phone', 'date','department','title','details','accept','reject'];
  constructor(public dialog:MatDialog,private Reserve:ReserveHospitalService) { }
  type: string = localStorage.getItem('userType') as string;
  dataSource!: Array<Reserve>;
  PageNumber: number = 1;
  pageSize: number = 5;
  totalItems: number = 0;
  isloading: boolean = false;
  openAccept(id: number) { 
    this.dialog.open(HospitalAproveComponent, {
      data: {
        "type": this.type,
        "id": id
      }
    });
  }

  openReject() {
      this.dialog.open(RejectDialogComponent);

  }

  ngOnInit(): void {
    this.Load();
  }
  
  onpaginEdit(event: { pageIndex: number, pageSize: number, length: number } | any) {
    this.PageNumber = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.totalItems = event.length;
    this.Load();
  }
  async Load() {
    this.isloading = true;
    (await this.Reserve.getReserveData(this.PageNumber, this.pageSize)).subscribe(data => {
      this.dataSource = data.items;
      this.PageNumber = data.currentPage;
      this.totalItems = data.totalItems;
      this.pageSize = data.itemsPerPage;
      this.isloading = false;
    }, err => {
      this.isloading = false;
    });
  }

 
}
 