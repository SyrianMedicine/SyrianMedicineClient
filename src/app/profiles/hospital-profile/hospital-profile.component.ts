import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { HospitalInfo } from 'src/app/Models/Hospital/HospitalInfo';
import { HospitalService } from 'src/app/Services/hospital/hospital.service';

@Component({
  selector: 'app-hospital-profile',
  templateUrl: './hospital-profile.component.html',
  styleUrls: ['./hospital-profile.component.scss']
})
export class HospitalProfileComponent implements OnInit {

  hospitalInfoData: HospitalInfo = new HospitalInfo();
  userName: string | any;


  constructor(private hospitalService: HospitalService, private dialog: MatDialog, private route: ActivatedRoute) { }

  async ngOnInit(): Promise<void> {
    this.userName = this.route.snapshot.paramMap.get("userName");
    (await this.hospitalService.getHospitalInfo(this.userName)).subscribe(data => {
      this.hospitalInfoData = data;
    })
  }

  openTemplete(templete: any) {
    this.dialog.open(templete, {
      width: '300px'
    });
  }

}
