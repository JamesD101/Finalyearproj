import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

import { ReactiveFormsModule } from '@angular/forms';
import { FileSelectDirective } from 'ng2-file-upload';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { BauthService } from './services/bauth.service';
import { BsignupComponent } from './components/bsignup/bsignup.component';
import { BloginComponent } from './components/login/blogin/blogin.component';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ViewprofileComponent } from './components/viewprofile/viewprofile.component';
import { MessageComponent } from './components/dashboard/bdashboard/message/message.component';
import { UploadComponent } from './components/dashboard/bdashboard/upload/upload.component';
import { AddinfoComponent } from './components/dashboard/bdashboard/addinfo/addinfo.component';
import { BdashboardComponent } from './components/dashboard/bdashboard/bdashboard.component';
import { SideBarComponent } from './components/dashboard/bdashboard/side-bar/side-bar.component'
import { ContentComponent } from './components/dashboard/bdashboard/content/content.component';
import { ProfilepicuploadComponent } from './components/dashboard/bdashboard/profilepicupload/profilepicupload.component';

@NgModule({
  declarations: [
    AppComponent,
    FileSelectDirective,
    HomeComponent,
    LoginComponent,
    BsignupComponent,
    NavbarComponent,
    BloginComponent,
    BdashboardComponent,
    SideBarComponent,
    ContentComponent,
    ViewprofileComponent,
    MessageComponent,
    UploadComponent,
    AddinfoComponent,
    ProfilepicuploadComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FlashMessagesModule
  ],
  providers: [BauthService, FlashMessagesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
