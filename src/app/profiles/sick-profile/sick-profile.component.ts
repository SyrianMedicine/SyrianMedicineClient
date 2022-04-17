import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { DynamicPagination } from 'src/app/Models/Helper/DynamicPagination';
import { SickInfo } from 'src/app/Models/Sick/SickInfo';
import { AccountService } from 'src/app/Services/Account/account.service';
import { postsLoadeFactory } from 'src/app/Services/post/postsLoadeFactory';
import { SickService } from 'src/app/Services/sick/sick.service';

@Component({
  selector: 'app-sick-profile',
  templateUrl: './sick-profile.component.html',
  styleUrls: ['./sick-profile.component.scss']
})
export class SickProfileComponent implements OnInit {

  userName: string | any;
  sickInfoData: SickInfo = new SickInfo();
  profilepostLoadfunc!:(page:DynamicPagination)=> Promise<Observable<any>>;

  constructor(private sickService: SickService, private dialog: MatDialog, private route: ActivatedRoute ,private accountService:AccountService) { 
    this.profilepostLoadfunc=postsLoadeFactory.getProfileLoadMethod(accountService,this.route.snapshot.paramMap.get("userName"));
  }

  async ngOnInit(): Promise<void> {
    this.userName = this.route.snapshot.paramMap.get("userName");
    (await this.sickService.getSickInfo(this.userName)).subscribe(data => {
      this.sickInfoData = data;
      console.log(data);
    });
  }

  openTemplete(templete: any) {
    this.dialog.open(templete, {
      width: '300px'
    });
  }

}
