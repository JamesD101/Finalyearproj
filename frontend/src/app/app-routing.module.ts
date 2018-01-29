import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { BsignupComponent } from './components/bsignup/bsignup.component';
import { CsignupComponent } from './components/csignup/csignup.component';
import { LoginComponent } from './components/login/login.component';
import { CloginComponent } from './components/login/clogin/clogin.component';
import { BloginComponent } from './components/login/blogin/blogin.component';
import { BdashboardComponent } from './components/dashboard/bdashboard/bdashboard.component';
import { CdashboardComponent } from './components/dashboard/cdashboard/cdashboard.component';
import { ContentComponent } from './components/dashboard/bdashboard/content/content.component';
import { MessageComponent } from './components/dashboard/bdashboard/message/message.component';
import { AddinfoComponent } from './components/dashboard/bdashboard/addinfo/addinfo.component';
import { UploadComponent } from './components/dashboard/bdashboard/upload/upload.component';
import { SearchServiceComponent } from './components/home/search-service/search-service.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'search', component: SearchServiceComponent },
  { path: 'home', component: HomeComponent },
  { path: 'bsignup', component: BsignupComponent },
  { path: 'csingup', component: CsignupComponent },
  { path: 'login', component: LoginComponent,
    children:
      [
        { path: 'clogin', component: CloginComponent },
        { path: 'blogin', component: BloginComponent }
        ]
  },
  { path: 'bdash', component: BdashboardComponent,
    children:
      [
        { path: '', component: ContentComponent },
        { path: 'reviews', component: ContentComponent },
        { path: 'message', component: MessageComponent },
        { path: 'addinfo', component: AddinfoComponent },
        { path: 'upload', component: UploadComponent },
        { path: 'cdash', component: CdashboardComponent }
      ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
