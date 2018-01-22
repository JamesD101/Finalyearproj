import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ServicesfinderComponent } from './components/home/servicesfinder/servicesfinder.component';
import { FilterservicesComponent } from './components/home/filterservices/filterservices.component';
import { LoginComponent } from './components/login/login.component';
import { BsignupComponent } from './components/bsignup/bsignup.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { BauthService } from './services/bauth.service';
import { CauthService } from './services/cauth.service';
import { CsignupComponent } from './components/csignup/csignup.component';
import { CloginComponent } from './components/login/clogin/clogin.component';
import { BloginComponent } from './components/login/blogin/blogin.component';
import { CdashboardComponent } from './components/dashboard/cdashboard/cdashboard.component';
import { BdashboardComponent } from './components/dashboard/bdashboard/bdashboard.component';
import { SideBarComponent } from './components/dashboard/bdashboard/side-bar/side-bar.component';
import { ContentComponent } from './components/dashboard/bdashboard/content/content.component';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { FlashMessagesService } from 'angular2-flash-messages';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ServicesfinderComponent,
    FilterservicesComponent,
    LoginComponent,
    BsignupComponent,
    NavbarComponent,
    CsignupComponent,
    CloginComponent,
    BloginComponent,
    CdashboardComponent,
    BdashboardComponent,
    SideBarComponent,
    ContentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FlashMessagesModule
  ],
  providers: [BauthService, CauthService, FlashMessagesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
