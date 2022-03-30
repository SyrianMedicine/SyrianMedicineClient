import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { SickInfo } from 'src/app/Models/Sick/SickInfo';
import { SickService } from 'src/app/Services/sick/sick.service';

@Component({
  selector: 'app-sick-profile',
  templateUrl: './sick-profile.component.html',
  styleUrls: ['./sick-profile.component.scss']
})
export class SickProfileComponent implements OnInit {

  userName: string | any;
  sickInfoData: SickInfo = new SickInfo();


  constructor(private sickService: SickService, private dialog: MatDialog, private route: ActivatedRoute) { }

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
