import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {

  constructor(private route:Router) { }

  ngOnInit(): void {
  }

  moveOn(){
    this.route.navigate(['/Comments']);
  }
}
