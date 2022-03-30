import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { usercard } from 'src/app/Models/usercard/usercard';
import { UserCardComponent } from '../user-card/user-card.component';
@Component({
  selector: 'app-user-coment',
  templateUrl: './user-coment.component.html',
  styleUrls: ['./user-coment.component.scss']
})
export class UserComentComponent implements OnInit {
  @Input() user!:usercard;
  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  getLink():string{
    return "/"+UserCardComponent.Route[this.user.userType-1]+"/"+this.user.userName;
  }
}
