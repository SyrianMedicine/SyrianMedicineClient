import { Component, Input, OnInit } from '@angular/core';
import { usercard } from 'src/app/Models/usercard/usercard';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent implements OnInit {
  @Input() user!:usercard;
  static Route=["Sick","Doctor", "Nurse", "Secretary", "Hospital", "Sick"]
  constructor() { }
  ngOnInit(): void {
  }
  getLink():string{
    return "/"+UserCardComponent.Route[this.user.userType-1]+"/"+this.user.userName;
  }

}
