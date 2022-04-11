import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SettingsComponent } from './Admin/settings/settings.component';
import { SideNavComponent } from './Admin/side-nav/side-nav.component';
import { UserProfileComponent } from './Admin/user-profile/user-profile.component';
import { OthersComponent } from './Admin/others/others.component';
import { DashboardComponent } from './Admin/dashboard/dashboard.component';
const routes: Routes = [
    {path :'Admin',
    children:[
      {path:"Userprofile",component:UserProfileComponent},
      {path:"Settings",component:SettingsComponent},
      {path:"Others",component:OthersComponent},
      {path:"Dashboard",component:DashboardComponent}
    ]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
