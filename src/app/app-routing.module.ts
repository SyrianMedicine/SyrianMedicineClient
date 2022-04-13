import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SideNavComponent } from './Common/side-nav/side-nav.component';
import { UserProfileComponent } from './Admin/user-profile/user-profile.component';
import { OthersComponent } from './Admin/others/others.component';
import { DashboardComponent } from './Admin/dashboard/dashboard.component';
const routes: Routes = [
    {path :'Common',
    children:[
      {path:"Userprofile",component:UserProfileComponent},
      {path:"Others",component:OthersComponent},
      {path:"Dashboard",component:DashboardComponent}
    ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
