import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core'; 
import { MatSnackBar,MatSnackBarHorizontalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import {  HubConnection, HubConnectionBuilder ,ILogger,MessageHeaders, NullLogger} from '@microsoft/signalr';
import { CommentOutput } from 'src/app/Models/Comment/CommentOutput';
import { PostOutput } from 'src/app/Models/Post/PostOutput';
import { usercard } from 'src/app/Models/usercard/usercard'; 
import { ExternalNotificationComponent } from '../external-notification/external-notification.component';
 
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit,OnDestroy {
  isCollapsed: boolean = true;
  userLogin: boolean = false;
  userName: string | any;
  userType: string | any;
  public notifcation:Array<{usercard:usercard,messege:string,link:string,date:Date}>=new Array<{usercard:usercard,messege:string,link:string,date:Date}>();
  private static Linkprefix:Array<string>= ["Sick", "Doctor", "Nurse", "Secretary", "Hospital", "Sick"]
  private connection!: HubConnection;

  constructor(public changeDetectorRef: ChangeDetectorRef,private router: Router,private dialog: MatSnackBar) { }
  ngOnDestroy(): void {
    if(this.connection!=null)
    {
      this.connection.stop(); 
    }
  }

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
    if(this.connection!=null)
    {
      this.connection.stop(); 
    }
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
      let dialog = this.dialog;
      let not=this.notifcation; 
      let x=this;
      this.connection.on("NotfiyUserFollowYou", function (us: usercard, mes: string) {
      let li= "/" + NavbarComponent.Linkprefix[us.userType - 1]+"/" + us.userName;
        x.notifcation.unshift({messege:mes,usercard:us,link:li,date:new Date()});
       x.changeDetectorRef.detectChanges();
        dialog.openFromComponent(ExternalNotificationComponent, { 
          panelClass:["rounded-6","card","notifcationbody"],
          duration:6000 , 
          data: { 
            messege: mes,
            user: us,
            link:li
          }
        })
      });
      this.connection.on("NotfiyPostCreated", function (post: PostOutput, mes: string) {
        let li="/Posts?id="+ post.id+"#specificpost";
        let use=post.user;
        let ms=mes+": \n"+post.postText.substring(0,60)+"...";
        x.notifcation.unshift({messege:ms,usercard:use,link:li,date:new Date()});
        x.changeDetectorRef.detectChanges();
        dialog.openFromComponent(ExternalNotificationComponent, {
          panelClass:["rounded-6","card","notifcationbody"],
          duration:6000 ,  
          data: {
            messege: ms,
            user:use ,
            link: li
          }
        })
      });
      this.connection.on("NotfiyCommentCreated", function (Comment: CommentOutput, mesege: string) {
        let li="/" + NavbarComponent.Linkprefix[Comment.user.userType - 1] +"/"+ Comment.user.userName;
        let use=Comment.user;
        let ms=mesege+": \n"+Comment.text.substring(0,60)+"...";
        x.notifcation.unshift({messege:ms,usercard:use,link:li,date:new Date()});
        x.changeDetectorRef.detectChanges();
        dialog.openFromComponent(ExternalNotificationComponent, {
          panelClass:["rounded-6","card","notifcationbody"],
          duration:6000 ,  
          data: {
            messege: ms,
            user: use,
            link: li
          }
        })
      });
    }
  }

}
