import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CsignupComponent } from './components/csignup/csignup.component';
import { LoginComponent } from './components/login/login.component';
import { SearchServiceComponent } from './components/home/servicesfinder/search-service/search-service.component';
import { DropSearchComponent } from './components/home/filterservices/drop-search/drop-search.component';
import { ServiceproviderComponent } from './components/home/servicesfinder/serviceprovider/serviceprovider.component';
import { MessageComponent } from './components/message/message.component';
import { ReviewsComponent } from './components/home/servicesfinder/serviceprovider/reviews/reviews.component';
import { WorksComponent } from './components/home/servicesfinder/serviceprovider/works/works.component';
import { CdashboardComponent } from './components/cdashboard/cdashboard.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'search', component: SearchServiceComponent },
  { path: 'search/:category/:state', component: SearchServiceComponent },
  { path: 'search/:category/:state/singleprovider/:id', component: ServiceproviderComponent,
    children: [
      { path: '', component: ReviewsComponent }
    ]
  },
  { path: 'works/:id', component: WorksComponent },
  { path: 'search/:category', component: DropSearchComponent },
  { path: 'home', component: HomeComponent },
  { path: 'message', component: MessageComponent },
  { path: 'csingup', component: CsignupComponent },
  { path: 'login', component: LoginComponent},
  { path: 'dashboard', component: CdashboardComponent },
  { path: '**', component: HomeComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
