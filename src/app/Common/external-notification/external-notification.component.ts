import { Component, Inject, OnInit } from '@angular/core'; 
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar'; 

@Component({
  selector: 'app-external-notification',
  templateUrl: './external-notification.component.html',
  styleUrls: ['./external-notification.component.scss']
})
export class ExternalNotificationComponent implements OnInit {
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data:any) { 
   }  
  ngOnInit(): void { 
     
  }
 

}
