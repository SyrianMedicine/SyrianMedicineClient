import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'client';
  Url!:string;
  constructor(private route:Router){
    route.events.subscribe(e=>{
      if(e instanceof NavigationEnd)
      {
        this.Url=e.url;
        console.log(this.Url);
      }
    });
  }
  displayNavBar():boolean{
    return  !(this.Url=="/Register"||this.Url=="/Login"||this.Url.startsWith('/Settings'));
  }
}
