import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-add-post-section',
  templateUrl: './add-post-section.component.html',
  styleUrls: ['./add-post-section.component.scss']
})
export class AddPostSectionComponent implements OnInit {
  chooseFile:boolean = false
  constructor(public dialog:MatDialogRef<AddPostSectionComponent>) { }

  ngOnInit(): void {

  }
  onChange(ob:MatSlideToggleChange){
    if(ob.checked == false){
      this.chooseFile = false
    }
    else
    this.chooseFile = true
  }
  close(){
    this.dialog.close();
  }

}
