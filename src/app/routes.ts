import { Routes } from "@angular/router";
import { DashboardComponent } from "./Admin/dashboard/dashboard.component";
import { OthersComponent } from "./Admin/others/others.component";
import { SettingsComponent } from "./Admin/settings/settings.component";
import { SideNavComponent } from "./Admin/side-nav/side-nav.component";
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
    { path: "**", component: MainComponent },
    { path:"SideNav" ,component:SideNavComponent},
    {path:"Userprofile",component:UserProfileComponent},
    {path:"Settings",component:SettingsComponent},
    {path:"Others",component:OthersComponent},
    {path:"Dashboard",component:DashboardComponent}
];
