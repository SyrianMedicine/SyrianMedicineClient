import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  hide = true;
  infoForm!:FormGroup
  constructor(private fb:FormBuilder) {
    // this.passwordForm=this.fb.group({
    //   'oldPassword':['',[Validators.required]],
    //   'newPassword':['',[Validators.required]]
    // })
   }
  ngOnInit(): void {
  }

}
