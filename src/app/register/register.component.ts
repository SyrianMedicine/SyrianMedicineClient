import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  typeAccount = 1;

  constructor() { }

  ngOnInit(): void {
  }
  selectOption(id: any) {
    this.typeAccount = id;
    console.log(id);
  }
}
