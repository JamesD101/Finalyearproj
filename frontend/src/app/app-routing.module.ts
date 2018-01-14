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

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'bsignup', component: BsignupComponent },
  { path: 'csingup', component: CsignupComponent },
  { path: 'login', component: LoginComponent,
    children:
      [
        { path: 'clogin', component: CloginComponent },
        { path: 'blogin', component: BloginComponent }
        ]
  },
  { path: 'bdash', component: BdashboardComponent },
  { path: 'cdash', component: CdashboardComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
