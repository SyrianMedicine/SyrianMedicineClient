import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, RouterLinkActive } from '@angular/router';
import { Observable } from 'rxjs';
import { AccountService } from 'src/app/Services/Account/account.service';
import { DashbordService } from 'src/app/Services/Dashbord/dashbord.service';
import { SyrianMedSnakBarService } from 'src/app/Services/SyrianMedSnakBar/syrian-med-snak-bar.service';

@Component({
  selector: 'app-validate-accounts',
  templateUrl: './validate-accounts.component.html',
  styleUrls: ['./validate-accounts.component.scss']
})
export class ValidateAccountsComponent implements OnInit {
  PageNumber: number = 1;
  pageSize: number = 5;
  totalItems: number = 0;
  isloading: boolean = false;
  type!:string;
  loadfunction!:(pageNumber: number, pageSize: number)=>Promise<Observable<any>>;
  validateFunc!:(id:number)=>Promise<Observable<any>>;
  ngOnInit(): void {
    this.Load();
  }
  openReject() {

  }
  constructor(Rout:ActivatedRoute,private snakbar:SyrianMedSnakBarService,public dialog: MatDialog, private accountService: AccountService, private dashbordService: DashbordService,private changeDetectorRef: ChangeDetectorRef) {
    Rout.data.subscribe(v=>{
      this.type=v['type'];
      this.loadfunction=this.accountService.getLoadValidateAccountMethod(this.type);
      this.validateFunc=this.dashbordService.getValidateMethod(this.type);
    });
  }

  async openAccept(id: number) {
    (await this.validateFunc(id) ).subscribe(data => {
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
  downloadMyFile(url:string |any){
    const link = document.createElement('a');
    link.setAttribute('target', '_blank');
    link.setAttribute('href', url);
    link.setAttribute('download', url);
    document.body.appendChild(link);
    link.click();
    link.remove();
}
  onpaginEdit(event: { pageIndex: number, pageSize: number, length: number } | any) {
    this.PageNumber = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.totalItems = event.length;
    this.Load();
  }
  async Load() {
    this.isloading = true;
    (await this.loadfunction(this.PageNumber, this.pageSize) ).subscribe(data => {
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

