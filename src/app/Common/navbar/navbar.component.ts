import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isCollapsed: boolean = true;
  userLogin: boolean = false;

  constructor() { }

  ngOnInit(): void {
    this.userLogin = localStorage.getItem("username") != null ? true : false;
  }

}
