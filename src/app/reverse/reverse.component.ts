import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog'; 
import { Reserve } from '../Models/Reserve/Reserve'; 
import { ReserveDoctorOrNurseService } from '../Services/Reserve/reserve-doctor-or-nurse.service';
import { SyrianMedSnakBarService } from '../Services/SyrianMedSnakBar/syrian-med-snak-bar.service';
import { DialogMessageComponent } from './dialog-message/dialog-message.component';
import { RejectDialogComponent } from './reject-dialog/reject-dialog.component';

@Component({
  selector: 'app-reverse',
  templateUrl: './reverse.component.html',
  styleUrls: ['./reverse.component.scss']
})
export class ReverseComponent implements OnInit {

  displayedColumns:Array<string> = ['id', 'name', 'email', 'phone', 'date', 'title', 'details', 'status', 'accept', 'reject'];
  type: string = localStorage.getItem('userType') as string;
  dataSource!: Array<Reserve>;
  PageNumber: number = 1;
  pageSize: number = 5;
  totalItems: number = 0;
  isloading: boolean = false;
  constructor(public dialog: MatDialog, private Reserve: ReserveDoctorOrNurseService, private snakBar: SyrianMedSnakBarService) {

  }

  openAccept(username: string) { 
    this.dialog.open(DialogMessageComponent, {
      data: {
        "type": this.type,
        "username": username
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
