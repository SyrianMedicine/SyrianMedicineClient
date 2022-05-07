import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import {  HubConnection, HubConnectionBuilder ,ILogger,MessageHeaders, NullLogger} from '@microsoft/signalr';
import { PostOutput } from 'src/app/Models/Post/PostOutput';
import { usercard } from 'src/app/Models/usercard/usercard'; 
import { ExternalNotificationComponent } from '../external-notification/external-notification.component';
 
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
  public notifcation:Array<{usercard:usercard,messege:string,date:Date}>=new Array<{usercard:usercard,messege:string,date:Date}>();
  private static Linkprefix:Array<string>= ["Sick", "Doctor", "Nurse", "Secretary", "Hospital", "Sick"]
  private connection!: HubConnection;

  constructor(public changeDetectorRef: ChangeDetectorRef,private router: Router,private dialog: MatDialog,) { }

  ngOnInit(): void {
    this.userLogin = localStorage.getItem("username") != null ? true : false;
    this.userName = localStorage.getItem("username");
    this.userType = localStorage.getItem("userType");
    this.constractconnection();
  }

  logout() {
    localStorage.removeItem("username");
    localStorage.removeItem("id");
    localStorage.removeItem("token");
    localStorage.removeItem("userType");
    window.location.reload();
  }
  constractconnection(){
    if (localStorage.getItem("token") != null) {
      
 
     this.connection = new HubConnectionBuilder().withUrl("https://syrian-medicine.herokuapp.com/Publichub",
        { 
          accessTokenFactory: () => localStorage.getItem("token") as string
        }
      ).withAutomaticReconnect().build();
      this.connection.start();
      let dialog: MatDialog = this.dialog;
      let not=this.notifcation; 
      let x=this;
      this.connection.on("NotfiyUserFollowYou", function (us: usercard, mes: string) {
       x.notifcation.unshift({messege:mes,usercard:us,date:new Date()});
       x.changeDetectorRef.detectChanges();
        dialog.open(ExternalNotificationComponent, { 
          panelClass:["notifcationbody","rounded-pill","card","p-0"],  
          hasBackdrop:false,  
          data: { 
            messege: mes,
            user: us,
            link: "/" + NavbarComponent.Linkprefix[us.userType - 1]+"/" + us.userName
          }
        })
      });
      this.connection.on("NotfiyPostCreated", function (post: PostOutput, mes: string) {
 
        dialog.open(ExternalNotificationComponent, {
          panelClass:"notifcationbody", 
          hasBackdrop:false,
          data: {
            messege: mes,
            user: post.user,
            link: "/" + NavbarComponent.Linkprefix[post.user.userType - 1] +"/"+ post.user.userName
          }
        })
      });
    }
  }

}
