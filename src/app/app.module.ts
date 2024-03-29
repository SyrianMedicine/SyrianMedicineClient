//#region Import libs
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main/main.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MdbDropdownModule } from 'mdb-angular-ui-kit/dropdown';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { MdbModalModule } from 'mdb-angular-ui-kit/modal';
import { MdbPopoverModule } from 'mdb-angular-ui-kit/popover';
import { MdbRadioModule } from 'mdb-angular-ui-kit/radio';
import { MdbRangeModule } from 'mdb-angular-ui-kit/range';
import { MdbRippleModule } from 'mdb-angular-ui-kit/ripple';
import { MdbScrollspyModule } from 'mdb-angular-ui-kit/scrollspy';
import { MdbTabsModule } from 'mdb-angular-ui-kit/tabs';
import { MdbTooltipModule } from 'mdb-angular-ui-kit/tooltip';
import { MdbValidationModule } from 'mdb-angular-ui-kit/validation';
import { MatPaginatorModule } from '@angular/material/paginator';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NavbarComponent } from './Common/navbar/navbar.component';
import { FooterComponent } from './Common/footer/footer.component';
import { MedicinesComponent } from './main/medicines/medicines.component';
import { HospitalsComponent } from './main/hospitals/hospitals.component';
import { NursesComponent } from './main/nurses/nurses.component';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';
import { routes } from './routes';
import { SickProfileComponent } from './profiles/sick-profile/sick-profile.component';
import { HospitalProfileComponent } from './profiles/hospital-profile/hospital-profile.component';
import { DoctorProfileComponent } from './profiles/doctor-profile/doctor-profile.component';
import { NurseProfileComponent } from './profiles/nurse-profile/nurse-profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RegisterComponent } from './register/register.component';
import { RegisterDialogComponent } from './register/dialogs/registerDialog/register-dialog/register-dialog.component';
import { MatButtonModule } from '@angular/material/button'
import { MatButtonToggleModule } from '@angular/material/button-toggle'
import { MatAutocompleteModule } from '@angular/material/autocomplete'
import { MatCardModule } from '@angular/material/card'
import { MatCheckboxModule } from '@angular/material/checkbox'
import { MatChipsModule } from '@angular/material/chips'
import { MatStepperModule } from '@angular/material/stepper'
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatDialogModule } from '@angular/material/dialog'
import { MatExpansionModule } from '@angular/material/expansion'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatGridListModule } from '@angular/material/grid-list'
import { MatIconModule } from '@angular/material/icon'
import { MatInputModule } from '@angular/material/input'
import { MatListModule } from '@angular/material/list'
import { MatMenuModule } from '@angular/material/menu'
import { MatTabsModule } from '@angular/material/tabs'
import { MatProgressBarModule } from '@angular/material/progress-bar'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { MatRadioModule } from '@angular/material/radio'
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { NgxPaginationModule } from 'ngx-pagination';
import { CommentComponent } from './Component/comment/comment.component';
import { UserCardComponent } from './Component/user-card/user-card.component';
import { PostComponent } from './Component/post/post.component';
import { PostsPageComponent } from './main/posts-page/posts-page.component';
import { RatingComponent } from './Common/rating/rating.component';
import { UserComentComponent } from './Component/user-coment/user-coment.component';
import { ReserveDateWithDoctorOrNurseComponent } from './Common/reservesDate/reserve-date-with-doctor-or-nurse/reserve-date-with-doctor-or-nurse.component';
import { HospitalreserveComponent } from './Common/reservesDate/HospitalReserve/hospitalreserve/hospitalreserve.component';
import { SideNavComponent } from './Common/side-nav/side-nav.component';
import { DashboardComponent } from './Admin/dashboard/dashboard.component';
import { UserProfileComponent } from './Admin/user-profile/user-profile.component';
import { OthersComponent } from './Admin/others/others.component';
import { UpdateDoctorComponent } from './UpdateAccounts/update-doctor/update-doctor.component';
import { UpdateNurseComponent } from './UpdateAccounts/update-nurse/update-nurse.component';
import { UpdateHospitalComponent } from './UpdateAccounts/update-hospital/update-hospital.component';
import { UpdateSickComponent } from './UpdateAccounts/update-sick/update-sick.component';
import { UpdatePassowrdComponent } from './update-passowrd/update-passowrd.component';
import { PostsSectionComponent } from './Component/posts-section/posts-section.component';
import { ProfileCommentSectionComponent } from './Component/profile-comment-section/profile-comment-section.component';
import { ReverseComponent } from './reverse/reverse.component';
import { DialogMessageComponent } from './reverse/dialog-message/dialog-message.component';
import { RejectDialogComponent } from './reverse/reject-dialog/reject-dialog.component'; 
import { HospitalReverseComponent } from './hospital-reverse/hospital-reverse.component';
import { ValidateAccountsComponent } from './Admin/validate-accounts/validate-accounts.component'; 
import { ContentNotificationComponent } from './Common/content-notification/content-notification.component';
import { ExternalNotificationComponent } from './Common/external-notification/external-notification.component';
import { AddPostSectionComponent } from './Component/add-post-section/add-post-section.component';
import { LikesComponent } from './Component/Likes/likes/likes.component';
import { HospitalAproveComponent } from './hospital-reverse/hospital-aprove/hospital-aprove.component';
//#endregion


@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    NavbarComponent,
    FooterComponent,
    MedicinesComponent,
    HospitalsComponent,
    RegisterComponent,
    NursesComponent,
    LoginComponent,
    SickProfileComponent,
    HospitalProfileComponent,
    DoctorProfileComponent,
    NurseProfileComponent,
    RegisterDialogComponent,
    CommentComponent,
    UserCardComponent,
    PostComponent,
    PostsPageComponent,
    RatingComponent,
    UserComentComponent,
    ReserveDateWithDoctorOrNurseComponent,
     HospitalreserveComponent,
     SideNavComponent,
     HospitalAproveComponent,
     DashboardComponent,
     UserProfileComponent,
     OthersComponent,
     UpdateDoctorComponent,
     UpdateNurseComponent,
     UpdateHospitalComponent,
     UpdatePassowrdComponent,
     UpdateSickComponent,
     ProfileCommentSectionComponent,
     PostsSectionComponent,
     ReverseComponent,
     DialogMessageComponent,
     RejectDialogComponent, 
     HospitalReverseComponent,
     ValidateAccountsComponent, 
     ContentNotificationComponent,
     ExternalNotificationComponent,
     AddPostSectionComponent,
     LikesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    MdbDropdownModule,
    MdbFormsModule,
    MdbModalModule,
    MdbPopoverModule,
    MdbRadioModule,
    MdbRangeModule,
    HttpClientModule,
    MdbRippleModule,
    MdbScrollspyModule,
    MdbTabsModule,
    MdbTooltipModule,
    MdbValidationModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatSelectModule,
    MatSnackBarModule,
    NgxPaginationModule,
    MatTabsModule,
    MatTableModule,
    MatSidenavModule,
    MatToolbarModule,
    MatPaginatorModule,
    MatSlideToggleModule
    // MatRippleModule,
    // MatSliderModule,
    // MatSlideToggleModule,
    // MatSnackBarModule,
    // MatSortModule,
    // MatTooltipModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }