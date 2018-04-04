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
  ) { }


  loggedIn() {
      return tokenNotExpired();
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
  getReviews(id): Observable<any> {
    this.loadToken();
    const headers = new HttpHeaders().set('Authorization', this.bauthToken);
    return this.http.get(this.domain + '/bauthentication/getreviews/' + id, {headers});
  }

  editBuserInfo(newbuser): Observable<any> {
    this.loadToken();
    const headers = new HttpHeaders().set('Authorization', this.bauthToken);
    return this.http.put(this.domain + '/bauthentication/adddesc/', newbuser, { headers } );
  }

  getProfile(): Observable<any> {
    this.loadToken();
    const headers = new HttpHeaders().set('Authorization', this.bauthToken);
    return this.http.get(this.domain + '/bauthentication/businessprofile', { headers });
  }
  checkRequest(id): Observable<any> {
    this.loadToken();
    const headers = new HttpHeaders().set('Authorization', this.bauthToken);
    // let  currentId = new HttpParams();
    // currentId = currentId.set('_id', id);
    return this.http.get(this.domain + '/bauthentication/checkrequest/' + id, {headers});
  }
  confirmedRequest(id): Observable<any> {
    this.loadToken();
    const headers = new HttpHeaders().set('Authorization', this.bauthToken);
    // let  currentId = new HttpParams();
    // currentId = currentId.set('_id', id);
    return this.http.get(this.domain + '/bauthentication/confirmedrequest/' + id, {headers});
  }
  acceptedRequest(id): Observable<any> {
    this.loadToken();
    const headers = new HttpHeaders().set('Authorization', this.bauthToken);
    // let  currentId = new HttpParams();
    // currentId = currentId.set('_id', id);
    return this.http.get(this.domain + '/bauthentication/acceptedrequest/' + id, {headers});
  }
  deleteReq(id): Observable<any>{
    this.loadToken();
    const headers = new HttpHeaders().set('Authorization', this.bauthToken);
    return this.http.get(this.domain + '/bauthentication/deleterequest/' + id, {headers});
  }
  acceptReq(id): Observable<any>{
    this.loadToken();
    const headers = new HttpHeaders().set('Authorization', this.bauthToken);
    return this.http.post(this.domain + '/bauthentication/acceptreq/' + id, {headers});
  }
  getSingleReq(id): Observable<any> {
    this.loadToken();
    const headers = new HttpHeaders().set('Authorization', this.bauthToken);
    return this.http.get(this.domain + '/bauthentication/singlereq/' + id, {headers});
  }

  upload(id, formData): Observable<any> {
    return this.http.post(this.domain + '/bauthentication/upload/' + id, formData );
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
