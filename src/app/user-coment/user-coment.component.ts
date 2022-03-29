import { Component, Input, OnInit } from '@angular/core';
import { usercard } from 'src/app/Models/usercard/usercard';
@Component({
  selector: 'app-user-coment',
  templateUrl: './user-coment.component.html',
  styleUrls: ['./user-coment.component.scss']
})
export class UserComentComponent implements OnInit {
  @Input() user!:usercard;
  constructor() { }

  ngOnInit(): void {
  }

}
