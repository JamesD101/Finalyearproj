import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class AuthService {

  domain = 'http://localhost:8080';
  authToken;
  auser;
  // userid;

  constructor(private http: HttpClient
  ) { }


  loggedIn() {
    return tokenNotExpired();
  }

  loadToken() {
    this.authToken = localStorage.getItem('token');
  }

  registerUser(auser): Observable<any> {
    return this.http.post(this.domain + '/aauthentication/register', auser);
  }
  loginUser(auser): Observable<any> {
    return this.http.post(this.domain + '/aauthentication/login', auser);
  }
  logoutUser() {
    this.authToken = null;
    this.auser = null;
    localStorage.clear();
  }

  getAllBuser(): Observable<any>{
    this.loadToken();
    const headers = new HttpHeaders().set('Authorization', this.authToken);
    return this.http.get(this.domain + '/aauthentication/allbuser', {headers});
  }
  getAllCuser(): Observable<any>{
    this.loadToken();
    const headers = new HttpHeaders().set('Authorization', this.authToken);
    return this.http.get(this.domain + '/aauthentication/allcuser', {headers});
  }
  getAllReq(): Observable<any>{
    this.loadToken();
    const headers = new HttpHeaders().set('Authorization', this.authToken);
    return this.http.get(this.domain + '/aauthentication/allreq', {headers});
  }
  getAllTransaction(): Observable<any>{
    this.loadToken();
    const headers = new HttpHeaders().set('Authorization', this.authToken);
    return this.http.get(this.domain + '/aauthentication/allaccreq', {headers});
  }
  getSP(businessname): Observable<any>{
    this.loadToken();
    const headers = new HttpHeaders().set('Authorization', this.authToken);
    return this.http.get(this.domain + '/aauthentication/search/' + businessname, {headers});
  }
  storeUserData(token, auser) {
    localStorage.setItem('token', token);
    localStorage.setItem('auser', JSON.stringify(auser));
    this.authToken = token;
    this.auser = auser;
  }

  // getProfile(): Observable<any> {
  //   this.loadToken();
  //   const headers = new HttpHeaders().set('Authorization', this.bauthToken);
  //   return this.http.get(this.domain + '/bauthentication/businessprofile', { headers });
  // }

}
