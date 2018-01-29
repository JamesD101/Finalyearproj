import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class BauthService {

  domain = 'http://localhost:8080';
  authToken;
  buser;

  constructor(private http: HttpClient) { }

  loggedIn(){
    return tokenNotExpired();
  }

  loadToken() {
    this.authToken = localStorage.getItem('token');
  }

  registerBusiness(buser): Observable<any> {
   return this.http.post(this.domain + '/authentication/bregister', buser);
  }
  loginBusiness(buser): Observable<any> {
    return this.http.post(this.domain + '/authentication/blogin', buser);
  }
  logoutBusiness(){
    this.authToken = null;
    this.buser = null;
    localStorage.clear();
  }
  storeUserData(token, buser){
    localStorage.setItem('token', token);
    localStorage.setItem('buser', JSON.stringify(buser));
    this.authToken = token;
    this.buser = buser;
  }
  searchBusiness(someSearch): Observable<any> {
    // this.loadToken();
    // const headers = new HttpHeaders().set('Authorization', this.authToken);
    // let search = new HttpParams();
    // search = search.append('category', someSearch.category);
    // search = search.append('state', someSearch.state);
    // const category = someSearch.category;
    // const state = someSearch.state;
    return this.http.get(this.domain + '/authentication/search/' + someSearch.category + '/' + someSearch.state );
      //{params: search, headers} );
  }

  getProfile(): Observable<any> {
    this.loadToken();
    const headers = new HttpHeaders().set('Authorization', this.authToken);
    return this.http.get(this.domain + '/authentication/businessprofile', { headers });
  }

  /* checkUsername(username): Observable<any> {
      return this.http.get(this.domain + '/authentication/checkUsername/' + username, { responseType: 'json' });
    }
    checkBusinessname(businessname): Observable<any> {
     return this.http.get(this.domain + '/authentication/checkBusiness/' + businessname, { responseType: 'json' });
    }
    checkBEmail(email): Observable<any> {
     return this.http.get(this.domain + '/authentication/checkBEmail/' + email, { responseType: 'json'});
    }
    checkCEmail(email): Observable<any> {
     return this.http.get(this.domain + 'authentication/checkEmail/' + email, { responseType: 'json' });
    }*/

}
