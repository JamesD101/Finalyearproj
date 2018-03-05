import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { BsignupComponent } from './components/bsignup/bsignup.component';
import { LoginComponent } from './components/login/login.component';
import { ProfilepicuploadComponent } from './components/dashboard/bdashboard/profilepicupload/profilepicupload.component';
// import { BloginComponent } from './components/login/blogin/blogin.component';
import { BdashboardComponent } from './components/dashboard/bdashboard/bdashboard.component';
import { ContentComponent } from './components/dashboard/bdashboard/content/content.component';
import { MessageComponent } from './components/dashboard/bdashboard/message/message.component';
import { AddinfoComponent } from './components/dashboard/bdashboard/addinfo/addinfo.component';
import { UploadComponent } from './components/dashboard/bdashboard/upload/upload.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'bsignup', component: BsignupComponent },
  { path: 'login', component: LoginComponent},
  { path: 'bdash', component: BdashboardComponent,
    children:
      [
        { path: '', component: ContentComponent },
        { path: 'reviews', component: ContentComponent },
        { path: 'profilepicture/:id', component: ProfilepicuploadComponent },
        { path: 'editprofile/:id', component: AddinfoComponent },
        { path: 'upload', component: UploadComponent }
      ]
  },
  { path: '**', component: HomeComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }