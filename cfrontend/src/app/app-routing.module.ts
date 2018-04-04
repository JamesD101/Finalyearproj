import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CsignupComponent } from './components/csignup/csignup.component';
import { LoginComponent } from './components/login/login.component';
import { SearchServiceComponent } from './components/home/servicesfinder/search-service/search-service.component';
import { ServiceproviderComponent } from './components/home/servicesfinder/serviceprovider/serviceprovider.component';
import { MessageComponent } from './components/message/message.component';
import { ReviewsComponent } from './components/home/servicesfinder/serviceprovider/reviews/reviews.component';
import { WorksComponent } from './components/home/servicesfinder/serviceprovider/works/works.component';
import { CdashboardComponent } from './components/cdashboard/cdashboard.component';
import { FilterSearchComponent } from './components/home/filterservices/filter-search/filter-search.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'search', component: SearchServiceComponent },
  { path: 'search/:category/:state', component: SearchServiceComponent },
  { path: 'search/:category/:state/singleprovider/:id', component: ServiceproviderComponent,
    children: [
      { path: '', component: ReviewsComponent }
    ]
  },
  { path: 'dashboard/singleprovider/:id', component: ServiceproviderComponent,
    children: [
      { path: '', component: ReviewsComponent }
    ]
  },
  { path: 'works/:id', component: WorksComponent },
  { path: 'search/:category/works/:id', component: WorksComponent },
  { path: 'search/:category/:state/works/:id', component: WorksComponent },
  { path: 'search/:category', component: FilterSearchComponent },
  { path: 'search/:category/singleprovider/:id', component: ServiceproviderComponent,
    children: [
      { path: '', component: ReviewsComponent }
    ]
  },
  { path: 'profile/:id', component: ServiceproviderComponent,
    children: [
      { path: '', component: ReviewsComponent }
    ]
  },
  { path: 'home', component: HomeComponent },
  { path: 'message', component: MessageComponent },
  { path: 'csignup', component: CsignupComponent },
  { path: 'login', component: LoginComponent},
  { path: 'dashboard', component: CdashboardComponent },
  { path: '**', component: HomeComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
