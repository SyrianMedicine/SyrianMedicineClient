import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { StarIRate } from 'src/app/Models/Rating/StarIRate';
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
  currentRating = 0;

  constructor(private route: ActivatedRoute, private ratingService: RatingService, private snackBar: MatSnackBar) { }
  async ngOnInit(): Promise<void> {
    this.userName = this.route.snapshot.paramMap.get("userName");
    (await this.ratingService.myRatingForUser(this.userName)).subscribe(data => {
      if (data.data.starNumber != null)
        this.currentRating = data.data.starNumber;
    });
    await this.userRatng();
  }

  async onRatingChange(starsNumber: any) {
    let star: number = starsNumber.target.value;

    (await this.ratingService.rateUser(this.userName, star)).subscribe(async () => {
      await this.userRatng();
    }, err => {
      this.snackBar.open(err, 'close', {
        duration: 3000,
        horizontalPosition: 'start',
        verticalPosition: 'bottom',
      });
    }
    );
  }

  async userRatng() {
    this.count1 = this.count2 = this.count3 = this.count4 = this.count5 = 0;
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

  isMyOwnProfile() {
    return localStorage.getItem("username") == this.userName;
  }

}
