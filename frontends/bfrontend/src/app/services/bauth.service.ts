import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { tokenNotExpired } from 'angular2-jwt';
// import { CauthService } from './cauth.service';

@Injectable()
export class BauthService {

  private searchedBuser = new BehaviorSubject<any>(null);
  currentSearch = this.searchedBuser.asObservable();
  private addingInfo = new BehaviorSubject<any>(null);
  theInfo = this.addingInfo.asObservable();
  domain = 'http://localhost:4000';
  bauthToken;
  buser;
  // userid;

  constructor(private http: HttpClient
              // private cauth: CauthService
  ) { }


  loggedIn() {
    // if (!this.cauth.loggedInC()) {
      return tokenNotExpired();
    // } else {
    //   return null;
    // }
  }

  loadToken() {
    this.bauthToken = localStorage.getItem('token');
  }

  registerBusiness(buser): Observable<any> {
   return this.http.post(this.domain + '/bauthentication/bregister', buser);
  }
  loginBusiness(buser): Observable<any> {
    return this.http.post(this.domain + '/bauthentication/blogin', buser);
  }
  logoutBusiness() {
    this.bauthToken = null;
    this.buser = null;
    localStorage.clear();
  }
  storeUserData(token, buser) {
    localStorage.setItem('token', token);
    localStorage.setItem('buser', JSON.stringify(buser));
    this.bauthToken = token;
    this.buser = buser;
  }

  editBuserInfo(pbuser, idme): Observable<any> {
    this.loadToken();
    const headers = new HttpHeaders().set('Authorization', this.bauthToken);
    let user = new HttpParams();
    user = user.append('id', idme._id);
    return this.http.put(this.domain + 'bauthentication/addinfo', pbuser, { params: user, headers });
  }

  getProfile(): Observable<any> {
    this.loadToken();
    const headers = new HttpHeaders().set('Authorization', this.bauthToken);
    return this.http.get(this.domain + '/bauthentication/businessprofile', { headers });
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
