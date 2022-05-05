import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { DialogMessageComponent } from 'src/app/doctor-reverse/dialog-message/dialog-message.component';
import { RejectDialogComponent } from 'src/app/doctor-reverse/reject-dialog/reject-dialog.component';
import { AccountService } from 'src/app/Services/Account/account.service';
import { DashbordService } from 'src/app/Services/Dashbord/dashbord.service';
import { SyrianMedSnakBarService } from 'src/app/Services/SyrianMedSnakBar/syrian-med-snak-bar.service';

@Component({
  selector: 'app-validate-doctors',
  templateUrl: './validate-doctors.component.html',
  styleUrls: ['./validate-doctors.component.scss']
})
export class ValidateDoctorsComponent implements OnInit {

  ngOnInit(): void {
    this.Load();
  }
  openReject() {
    
  }
  constructor(private snakbar:SyrianMedSnakBarService,public dialog: MatDialog, private accountService: AccountService, private dashbordService: DashbordService,private changeDetectorRef: ChangeDetectorRef) { }
  PageNumber: number = 1;
  pageSize: number = 5;
  totalItems: number = 0;
  isloading: boolean = false;
  async openAccept(id: number) {
    (await this.dashbordService.ValidateDoctor(id)).subscribe(data => {
      this.snakbar.openSuccess(data.message);
      for (let index = 0; index < this.dataSource.length; index++) {
        if(this.dataSource[index].id===id){
          this.dataSource.splice(index, 1); 
        } 
      }
      this.changeDetectorRef.detectChanges();
    },er=>this.snakbar.openError(er.error.message));
  }
  displayedColumns = ['id', 'name', 'email', 'phone', 'date', 'download', 'accept', 'reject'];
  dataSource = new Array<Element>();

  onpaginEdit(event: { pageIndex: number, pageSize: number, length: number } | any) {
    this.PageNumber = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.totalItems = event.length;
    this.Load();
  }
  async Load() {
    this.isloading = true;
    (await this.accountService.GetValidateDoctorsAccount(this.PageNumber, this.pageSize)).subscribe(data => {
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
export interface Element {
  id: number,
  name: string;
  email: string,
  date: string,
  phone: string,
  documents: string
}

