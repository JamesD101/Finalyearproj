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
import { NavbarComponent } from './components/navbar/navbar.component';
import { CauthService } from './services/cauth.service';
import { CsignupComponent } from './components/csignup/csignup.component';
import { CloginComponent } from './components/login/clogin/clogin.component';
import { CdashboardComponent } from './components/cdashboard/cdashboard.component';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { FlashMessagesService } from 'angular2-flash-messages';
import { SearchServiceComponent } from './components/home/servicesfinder/search-service/search-service.component';
import { SearchSideBarComponent } from './components/home/servicesfinder/search-service/search-side-bar/search-side-bar.component';
import { SearchContentComponent } from './components/home/servicesfinder/search-service/search-content/search-content.component';
import { SearchBarComponent } from './components/home/servicesfinder/search-service/search-bar/search-bar.component';
import { DropSearchComponent } from './components/home/filterservices/drop-search/drop-search.component';
import { ServiceproviderComponent } from './components/home/servicesfinder/serviceprovider/serviceprovider.component';
import { SideBarComponent } from './components/home/servicesfinder/serviceprovider/side-bar/side-bar.component'
import { MessageComponent } from './components/message/message.component';
import { ReviewsComponent } from './components/home/servicesfinder/serviceprovider/reviews/reviews.component';
import { WorksComponent } from './components/home/servicesfinder/serviceprovider/works/works.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ServicesfinderComponent,
    FilterservicesComponent,
    LoginComponent,
    NavbarComponent,
    CsignupComponent,
    CloginComponent,
    CdashboardComponent,
    SearchServiceComponent,
    SearchSideBarComponent,
    SearchContentComponent,
    SearchBarComponent,
    DropSearchComponent,
    ServiceproviderComponent,
    SideBarComponent,
    MessageComponent,
    ReviewsComponent,
    WorksComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FlashMessagesModule
  ],
  providers: [CauthService, FlashMessagesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
