import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MakeloanComponent } from './makeloan/makeloan.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { MyguardGuard } from './guard/myguard.guard';
import { ViewusersComponent } from './viewusers/viewusers.component';
import { UserdetailsComponent } from './userdetails/userdetails.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { PendinglistComponent } from './pendinglist/pendinglist.component';
import { ApprovedlistComponent } from './approvedlist/approvedlist.component';
import { HomeUserComponent } from './home-user/home-user.component';
import { RoleguardGuard } from './guard/roleguard.guard';
import { DeclinedlistComponent } from './declinedlist/declinedlist.component';

const routes: Routes = [
  {path: '',component:HomeComponent,
  canActivate:[MyguardGuard,RoleguardGuard]
},
  {path:'makeloan', component:MakeloanComponent },
  {path:'login',component:LoginComponent},
  {path:'loan',component:ViewusersComponent, canActivate:[MyguardGuard,RoleguardGuard]},
  {path:'loan/pending',component:PendinglistComponent, canActivate:[MyguardGuard,RoleguardGuard]},
  {path:'loan/approved',component:ApprovedlistComponent,canActivate:[MyguardGuard,RoleguardGuard]},
  {path:'loan/declined',component:DeclinedlistComponent,canActivate:[MyguardGuard,RoleguardGuard]},
  {path:'userdetails/:id',component:UserdetailsComponent},
  // {path:'userdetails/:id/installments/:index',component:PagenotfoundComponent},
  {path:'homeuser',component:HomeUserComponent},
  {path:'**' ,component:PagenotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
