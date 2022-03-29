import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isCollapsed: boolean = true;
  userLogin: boolean = false;
  userName: string | any;
  userType: string | any;


  constructor(private router: Router) { }

  ngOnInit(): void {
    this.userLogin = localStorage.getItem("username") != null ? true : false;
    this.userName = localStorage.getItem("username");
    this.userType = localStorage.getItem("userType");
  }

  logout() {
    localStorage.removeItem("username");
    localStorage.removeItem("id");
    localStorage.removeItem("token");
    localStorage.removeItem("userType");
    window.location.reload();
  }

}
