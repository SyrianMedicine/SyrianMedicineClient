import {  Component,  OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { Pagination } from '../Models/Helper/Pagination';
import { Reserve } from '../Models/Reserve/Reserve';
import { DoctorService } from '../Services/doctor/doctor.service';
import { SyrianMedSnakBarService } from '../Services/SyrianMedSnakBar/syrian-med-snak-bar.service';
import { DialogMessageComponent } from './dialog-message/dialog-message.component';
import { RejectDialogComponent } from './reject-dialog/reject-dialog.component';

@Component({
  selector: 'app-doctor-reverse',
  templateUrl: './doctor-reverse.component.html',
  styleUrls: ['./doctor-reverse.component.scss']
})
export class DoctorReverseComponent implements  OnInit{

  displayedColumns = ['id', 'name', 'email' ,'phone', 'date','title','details','status','accept','reject'];
  dataSource!:Array<Reserve>;
  PageNumber:number=1;
  pageSize:number=5;
  totalItems:number=0;
  isloading:boolean=false;
  constructor(public dialog:MatDialog,private doctorService:DoctorService,private snakBar:SyrianMedSnakBarService){

  }

  openAccept() {
    this.dialog.open(DialogMessageComponent);
  }

  openReject() {
    this.dialog.open(RejectDialogComponent)
  }

   ngOnInit():void {
    this.Load();
   }

   onpaginEdit(event:{pageIndex: number, pageSize: number, length: number}|any){
    this.PageNumber=event.pageIndex+1;
    this.pageSize  =event.pageSize;
    this.totalItems=event.length;
    this.Load();
   }
   async Load(){
     this.isloading=true;
    (await this.doctorService.getReserveDoctorData(this.PageNumber,this.pageSize)).subscribe(data=>{
    this.dataSource=data.items;
    this.PageNumber=data.currentPage;
    this.totalItems=data.totalItems;
    this.pageSize  =data.itemsPerPage;
    this.isloading=false;
    },err=>{
      this.isloading=false;
    });
   }
}
