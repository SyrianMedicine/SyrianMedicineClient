import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-reject-dialog',
  templateUrl: './reject-dialog.component.html',
  styleUrls: ['./reject-dialog.component.scss']
})
export class RejectDialogComponent implements OnInit {

  constructor( public dialog:MatDialogRef<RejectDialogComponent>) { }

  ngOnInit(): void {
  }
  close(){
    this.dialog.close();
  }
}
