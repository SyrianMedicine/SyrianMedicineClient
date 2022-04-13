import { Component, HostListener, Input, OnDestroy, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { UserTypes } from 'src/app/Models/Enums/UserTypes';
import { AccountService } from 'src/app/Services/Account/account.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {

  userName: string = "";
  userType: string = "Sick";
  widthScreen!: number;

  @HostListener('window:resize', ['$event'])
  getScreenSize() {
    this.widthScreen = window.innerWidth;
  }

  constructor(private accountService: AccountService) {
    this.getScreenSize();
  }

  async ngOnInit(): Promise<void> {
    this.userName = localStorage.getItem('username')!;
    this.userType =localStorage.getItem('userType')!;
  }
}
