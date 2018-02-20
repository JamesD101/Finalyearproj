import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CsignupComponent } from './components/csignup/csignup.component';
import { LoginComponent } from './components/login/login.component';
import { CloginComponent } from './components/login/clogin/clogin.component';
import { CdashboardComponent } from './components/dashboard/cdashboard/cdashboard.component';
import { SearchServiceComponent } from './components/home/servicesfinder/search-service/search-service.component';
import { DropSearchComponent } from './components/home/filterservices/drop-search/drop-search.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'search', component: SearchServiceComponent },
  { path: 'search/:category/:state', component: SearchServiceComponent },
  { path: 'search/:category', component: DropSearchComponent },
  { path: 'home', component: HomeComponent },
  { path: 'csingup', component: CsignupComponent },
  { path: 'login', component: LoginComponent},
  { path: '**', component: HomeComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
