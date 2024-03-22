import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MakeloanComponent } from './makeloan/makeloan.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ViewusersComponent } from './viewusers/viewusers.component';
import { UserdetailsComponent } from './userdetails/userdetails.component';
import { DatePipe } from '@angular/common';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { PendinglistComponent } from './pendinglist/pendinglist.component';
import { ApprovedlistComponent } from './approvedlist/approvedlist.component';
import { HomeUserComponent } from './home-user/home-user.component';
import { PaginationComponent } from './pagination/pagination.component';
import { DeclinedlistComponent } from './declinedlist/declinedlist.component';
import * as CryptoJS from 'crypto-js';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MakeloanComponent,
    LoginComponent,
    HomeComponent,
    ViewusersComponent,
    UserdetailsComponent,
    PagenotfoundComponent,
    PendinglistComponent,
    ApprovedlistComponent,
    HomeUserComponent,
    PaginationComponent,
    DeclinedlistComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
   
  ],
  providers: [ DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
