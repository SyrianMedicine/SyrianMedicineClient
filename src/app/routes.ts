import { Routes } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { HospitalsComponent } from "./main/hospitals/hospitals.component";
import { MainComponent } from "./main/main/main.component";
import { MedicinesComponent } from "./main/medicines/medicines.component";
import { NursesComponent } from "./main/nurses/nurses.component";
import { PostsComponent } from "./main/posts/posts.component";
import { RegisterComponent } from "./register/register.component";

export const routes: Routes = [
    { path: "home", component: MainComponent },
    { path: "Register", component: RegisterComponent },
    { path: "Login", component: LoginComponent },
    { path: "Doctors", component: MedicinesComponent },
    { path: "Hospitals", component: HospitalsComponent },
    { path: "Nurses", component: NursesComponent },
    { path: "Posts", component: PostsComponent },
    { path: "**", component: MainComponent }
];