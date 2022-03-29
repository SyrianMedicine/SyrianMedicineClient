import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { NurseInfo } from 'src/app/Models/Nurse/NurseInfo';
import { NurseService } from 'src/app/Services/nurse/nurse.service';

@Component({
  selector: 'app-nurse-profile',
  templateUrl: './nurse-profile.component.html',
  styleUrls: ['./nurse-profile.component.scss']
})
export class NurseProfileComponent implements OnInit {

  nurseInfoData: NurseInfo = new NurseInfo();
  userName: string | any;
  startWorkTime: string | any;
  endWorkTime: string | any;

  constructor(private nurseService: NurseService, private dialog: MatDialog, private route: ActivatedRoute) { }

  async ngOnInit(): Promise<void> {
    this.userName = this.route.snapshot.paramMap.get("userName");
    (await this.nurseService.getNurseInfo(this.userName)).subscribe(data => {
      this.nurseInfoData = data;
      this.startWorkTime = this.nurseInfoData.startTimeWork.toString().substring(11);
      this.endWorkTime = this.nurseInfoData.endTimeWork.toString().substring(11);
    });
  }

  openTemplete(templete: any) {
    this.dialog.open(templete, {
      width: '300px'
    });
  }

}
