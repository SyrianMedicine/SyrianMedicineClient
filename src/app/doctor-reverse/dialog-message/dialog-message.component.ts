import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-dialog-message',
  templateUrl: './dialog-message.component.html',
  styleUrls: ['./dialog-message.component.scss']
})
export class DialogMessageComponent implements  OnInit{
  msege!:string;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,public dialog:MatDialogRef<DialogMessageComponent>) {
  }
  ngOnInit(): void {

  }
  close(){
    this.dialog.close();
  }
}

