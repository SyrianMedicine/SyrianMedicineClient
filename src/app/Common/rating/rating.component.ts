import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserRate } from 'src/app/Models/Rating/UserRate';
import { RatingService } from 'src/app/Services/rating/rating.service';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent implements OnInit {

  userName: any;
  userRateData: UserRate = new UserRate();

  count1 = 0;
  count2 = 0;
  count3 = 0;
  count4 = 0;
  count5 = 0;

  constructor(private route: ActivatedRoute, private ratingService: RatingService) { }
  async ngOnInit(): Promise<void> {
    this.userName = this.route.snapshot.paramMap.get("userName");
    (await this.ratingService.getRateUser(this.userName)).subscribe(data => {
      this.userRateData = data;
      this.userRateData.data.ratingData.forEach(element => {
        if (element.starNumber == 1) {
          this.count1 = element.count;
        }
        if (element.starNumber == 2) {
          this.count2 = element.count;
        }
        if (element.starNumber == 3) {
          this.count3 = element.count;
        }
        if (element.starNumber == 4) {
          this.count4 = element.count;
        }
        if (element.starNumber == 5) {
          this.count5 = element.count;
        }
      });
    });
  }

}
