import { Component, Input, OnInit } from '@angular/core';
import { usercard } from 'src/app/Models/usercard/usercard';

@Component({
  selector: 'app-content-notification',
  templateUrl: './content-notification.component.html',
  styleUrls: ['./content-notification.component.scss']
})
export class ContentNotificationComponent implements OnInit {

  constructor() { }
  @Input() messege!:string; 
  @Input() user!:usercard;
  @Input()Date!:Date;
  @Input() link!:string;
  ngOnInit(): void {
  }

}
