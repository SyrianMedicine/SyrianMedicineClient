import { Component, HostListener, Input, OnDestroy, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit{

  widthScreen!:number;
  @HostListener('window:resize',['$event'])
  getScreenSize(){
    this.widthScreen=window.innerWidth;
  }

  constructor() {
      this.getScreenSize();
  }

  ngOnInit(): void {

  }


}
