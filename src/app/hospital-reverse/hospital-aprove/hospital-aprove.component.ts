import { Component, Inject, OnInit, Output ,EventEmitter} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ReserveState } from 'src/app/Models/Reserve/ReserveState';
import { ReserveDoctorOrNurseService } from 'src/app/Services/Reserve/reserve-doctor-or-nurse.service';
import { SyrianMedSnakBarService } from 'src/app/Services/SyrianMedSnakBar/syrian-med-snak-bar.service';
@Component({
  selector: 'app-hospital-aprove',
  templateUrl: './hospital-aprove.component.html',
  styleUrls: ['./hospital-aprove.component.scss']
})
export class HospitalAproveComponent implements OnInit {
  time: any; 
  username!: string;
  isloding: boolean = false;
  @Output() ondon: EventEmitter<string> = new EventEmitter<string>();
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private snakbar:SyrianMedSnakBarService, private Reserve: ReserveDoctorOrNurseService, public dialog: MatDialogRef<HospitalAproveComponent>) {
    this.username = this.data["username"]; 
  }
  ngOnInit(): void {

  }
  async send() {
    this.isloding = true;
    (await this.Reserve.CheckReserve(this.username, ReserveState.Approved, this.time)).subscribe(
      d => { 
        this.isloding = false; 
        this.ondon.emit(this.data["username"]);
        this.snakbar.openSuccess(d.message);
        this.dialog.close();
      }, err => {
        this.snakbar.openSuccess(err.error.message);
        this.isloding = false;
      }
    );
  }
  close() {
    this.dialog.close();
  }
}

