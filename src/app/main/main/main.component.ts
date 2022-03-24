import { Component, OnInit } from '@angular/core';
import { MostDoctorsRatedData } from 'src/app/Models/Doctor/MostDoctorsRated';
import { MostHospitalsRatedData } from 'src/app/Models/Hospital/MostHospitalsRated';
import { MostNursesRatedData } from 'src/app/Models/Nurse/MostNursesRated';
import { MostPostsRated } from 'src/app/Models/Post/MostPostsRated';
import { DoctorService } from 'src/app/Services/doctor/doctor.service';
import { HospitalService } from 'src/app/Services/hospital/hospital.service';
import { NurseService } from 'src/app/Services/nurse/nurse.service';
import { PostService } from 'src/app/Services/post/post.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  mostDoctorsRated: MostDoctorsRatedData[] = [];
  mostNursesRated: MostNursesRatedData[] = [];
  mostHospitalsRated: MostHospitalsRatedData[] = [];
  mostPostsRated: MostPostsRated[] = []

  constructor(private doctorService: DoctorService, private nurseService: NurseService,
    private hospitalService: HospitalService, private postService: PostService) {

  }

  async ngOnInit(): Promise<void> {

    await (await this.doctorService.getMostDoctorsRated(1, 3)).subscribe(data => {
      this.mostDoctorsRated = data.items;
      for (let i = 0; i < data.items.length; i++) {
        if (this.mostDoctorsRated[i].pictureUrl == null) {
          this.mostDoctorsRated[i].pictureUrl = "assets/images/no-image.png"
        }
        if (this.mostDoctorsRated[i].aboutMe.length > 44) {
          this.mostDoctorsRated[i].shortAboutMeForDoctor = this.mostDoctorsRated[i].aboutMe.substring(0, 44) + "...";
        }
        else {
          this.mostDoctorsRated[i].shortAboutMeForDoctor = this.mostDoctorsRated[i].aboutMe;
        }
      }
    });

    await (await this.nurseService.getMostNursesRated(1, 3)).subscribe(data => {
      this.mostNursesRated = data.items;
      for (let i = 0; i < data.items.length; i++) {
        if (this.mostNursesRated[i].pictureUrl == null) {
          this.mostNursesRated[i].pictureUrl = "assets/images/no-image.png"
        }
        if (this.mostNursesRated[i].aboutMe.length > 44) {
          this.mostNursesRated[i].shortAboutMeForNurse = this.mostNursesRated[i].aboutMe.substring(0, 44) + "...";
        }
        else {
          this.mostNursesRated[i].shortAboutMeForNurse = this.mostNursesRated[i].aboutMe;
        }

      };
    });

    await (await this.hospitalService.getMostHospitalsRated(1, 3)).subscribe(data => {
      this.mostHospitalsRated = data.items;
      for (let i = 0; i < data.items.length; i++) {
        if (this.mostHospitalsRated[i].pictureUrl == null) {
          this.mostHospitalsRated[i].pictureUrl = "assets/images/no-img.jpg"
        }
        if (this.mostHospitalsRated[i].aboutHospital.length > 44) {
          this.mostHospitalsRated[i].shortAboutMeForHospital = this.mostHospitalsRated[i].aboutHospital.substring(0, 44) + "...";
        }
        else {
          this.mostHospitalsRated[i].shortAboutMeForHospital = this.mostHospitalsRated[i].aboutHospital;
        }

      }
    });

    await (await this.postService.getMostPostsRated(1, 3)).subscribe(data => {
      this.mostPostsRated = data.items;
      for (let i = 0; i < data.items.length; i++) {
        this.mostPostsRated[i].shortPostText = this.mostPostsRated[i].postText;
        if (this.mostPostsRated[i].postText.length > 44) {
          this.mostPostsRated[i].shortPostText = this.mostPostsRated[i].postText.substring(0, 44) + "...";
        }
        if (this.mostPostsRated[i].medialUrl == null) {
          this.mostPostsRated[i].medialUrl = "assets/images/no-img.jpg"
        }
      }
    });

  }

}
