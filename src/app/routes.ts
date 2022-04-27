import { Routes } from "@angular/router";
import { DashboardComponent } from "./Admin/dashboard/dashboard.component";
import { OthersComponent } from "./Admin/others/others.component";
import { SideNavComponent } from "./Common/side-nav/side-nav.component";
import { UserProfileComponent } from "./Admin/user-profile/user-profile.component";
import { LoginComponent } from "./login/login.component";
import { HospitalsComponent } from "./main/hospitals/hospitals.component";
import { MainComponent } from "./main/main/main.component";
import { MedicinesComponent } from "./main/medicines/medicines.component";
import { NursesComponent } from "./main/nurses/nurses.component";
import { PostsPageComponent } from "./main/posts-page/posts-page.component";
import { DoctorProfileComponent } from "./profiles/doctor-profile/doctor-profile.component";
import { HospitalProfileComponent } from "./profiles/hospital-profile/hospital-profile.component";
import { NurseProfileComponent } from "./profiles/nurse-profile/nurse-profile.component";
import { SickProfileComponent } from "./profiles/sick-profile/sick-profile.component";
import { RegisterComponent } from "./register/register.component";
import { DoctorReverseComponent } from "./doctor-reverse/doctor-reverse.component";
import { HospitalreserveComponent } from "./Common/reservesDate/HospitalReserve/hospitalreserve/hospitalreserve.component";
import { NurseReverseComponent } from "./nurse-reverse/nurse-reverse.component";
import { UpdatePassowrdComponent } from "./update-passowrd/update-passowrd.component";
import { UpdateDoctorComponent } from "./UpdateAccounts/update-doctor/update-doctor.component";
import { Component } from "@angular/core";
import { ValidateDoctorsComponent } from "./Admin/validate-doctors/validate-doctors.component";
import { ValidateNursesComponent } from "./Admin/validate-nurses/validate-nurses.component";
import { ValidateHospitalsComponent } from "./Admin/validate-hospitals/validate-hospitals.component";
import { UpdateNurseComponent } from "./UpdateAccounts/update-nurse/update-nurse.component";
import { UpdateSickComponent } from "./UpdateAccounts/update-sick/update-sick.component";
import { UpdateHospitalComponent } from "./UpdateAccounts/update-hospital/update-hospital.component";

export const routes: Routes = [
    { path: "home", component: MainComponent },
    { path: "Register", component: RegisterComponent },
    { path: "Login", component: LoginComponent },
    { path: "Doctors", component: MedicinesComponent },
    { path: "Hospitals", component: HospitalsComponent },
    { path: "Nurses", component: NursesComponent },
    { path: "Posts", component: PostsPageComponent },
    { path: "Doctor/:userName", component: DoctorProfileComponent },
    { path: "Hospital/:userName", component: HospitalProfileComponent },
    { path: "Nurse/:userName", component: NurseProfileComponent },
    { path: "Sick/:userName", component: SickProfileComponent },
    { path:"Settings" ,component:SideNavComponent,
    children:[
      {path:'updatePassword',component:UpdatePassowrdComponent},
      {path:'validateDoctors',component:ValidateDoctorsComponent},
      {path:'validateNurses',component:ValidateNursesComponent},
      {path:'validateHospitals',component:ValidateHospitalsComponent},
      {path:'updateDoctors',component:UpdateDoctorComponent},
      {path:'updateNurse',component:UpdateNurseComponent},
      {path:'updateHospital',component:UpdateHospitalComponent},
      {path:'updateSick',component:UpdateSickComponent},
      {path:'doctorReserve', component:DoctorReverseComponent},
      {path:'nurseReserve', component:NurseReverseComponent},
      {path:'hospitalReserve', component:HospitalreserveComponent},
      {path:'updateAdmin', component:UserProfileComponent},
    ]},
    { path:"DoctorReverse",component:DoctorReverseComponent},
    { path:"HospitalReverse",component:HospitalreserveComponent},
    { path:"NurseReverse",component:NurseReverseComponent},
    { path: "**", component: MainComponent },
];
