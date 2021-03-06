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
import { ReverseComponent } from "./reverse/reverse.component"; 
import { UpdatePassowrdComponent } from "./update-passowrd/update-passowrd.component";
import { UpdateDoctorComponent } from "./UpdateAccounts/update-doctor/update-doctor.component"; 
import { ValidateAccountsComponent } from "./Admin/validate-accounts/validate-accounts.component"; 
import { UpdateNurseComponent } from "./UpdateAccounts/update-nurse/update-nurse.component";
import { UpdateSickComponent } from "./UpdateAccounts/update-sick/update-sick.component";
import { UpdateHospitalComponent } from "./UpdateAccounts/update-hospital/update-hospital.component";
import { HospitalReverseComponent } from "./hospital-reverse/hospital-reverse.component";

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
      {path:'validateDoctors',component:ValidateAccountsComponent,data:{'type':"Dcotors"}},
      {path:'validateNurses',component:ValidateAccountsComponent,data:{'type':"Nurses"}},
      {path:'validateHospitals',component:ValidateAccountsComponent,data:{'type':"Hospitals"}},
      {path:'updateDoctors',component:UpdateDoctorComponent},
      {path:'updateNurse',component:UpdateNurseComponent},
      {path:'updateHospital',component:UpdateHospitalComponent},
      {path:'updateSick',component:UpdateSickComponent},
      {path:'Reserve', component:ReverseComponent}, 
      {path:'hospitalReserve', component:HospitalReverseComponent},
      {path:'updateAdmin', component:UserProfileComponent},
    ]},
    { path:"Reverse",component:ReverseComponent},
    { path:"HospitalReverse",component:HospitalReverseComponent}, 
    { path: "**", component: MainComponent },
];
