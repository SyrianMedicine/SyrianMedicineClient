import { Component, Input, OnInit } from '@angular/core';
import { usercard } from 'src/app/Models/usercard/usercard';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent implements OnInit {
  @Input() user!:usercard;
  constructor() { }
  
  ngOnInit(): void {
    
  }

}
