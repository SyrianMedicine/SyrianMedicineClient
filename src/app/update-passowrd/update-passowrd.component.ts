import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-passowrd',
  templateUrl: './update-passowrd.component.html',
  styleUrls: ['./update-passowrd.component.scss']
})
export class UpdatePassowrdComponent implements OnInit {
  hide = true;
  passwordForm!:FormGroup
  constructor(private fb:FormBuilder) {
    this.passwordForm=this.fb.group({
      'oldPassword':['',[Validators.required]],
      'newPassword':['',[Validators.required]]
    })
   }

  ngOnInit(): void {
  }

}
