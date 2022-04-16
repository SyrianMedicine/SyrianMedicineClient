import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile-comment-section',
  templateUrl: './profile-comment-section.component.html',
  styleUrls: ['./profile-comment-section.component.scss']
})
export class ProfileCommentSectionComponent implements OnInit {
  username!:string;
  constructor(private route: ActivatedRoute) {
    this.route.snapshot.paramMap.get("userName");
   }
  ngOnInit(): void {
  }

}
