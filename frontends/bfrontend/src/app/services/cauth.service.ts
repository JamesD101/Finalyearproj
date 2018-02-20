import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { tokenNotExpired } from 'angular2-jwt';
import { BauthService } from './bauth.service';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class CauthService {

  private searchedBuser = new BehaviorSubject<any>(null);
  currentSearch = this.searchedBuser.asObservable();
  private addingInfo = new BehaviorSubject<any>(null);
  theInfo = this.addingInfo.asObservable();
  domain = 'http://localhost:5000';
  cauthToken;
  cuser;
  // userid;

  constructor( private http: HttpClient, private bauth: BauthService) { }

  loggedInC() {
  // if (!this.bauth.loggedIn()) {
    return tokenNotExpired();
  // } else {
  //   return null;
  // }

  }
  loadTokenC() {
    this.cauthToken = localStorage.getItem('token');
  }

  setInfo(data) {
    this.addingInfo.next(data);
  }

  setSearch(data) {
    this.searchedBuser.next(data);
  }

  registerCustomer(cuser): Observable<any> {
    return this.http.post(this.domain + '/cauthentication/cregister', cuser);
  }

  loginCustomer(cuser): Observable<any> {
    return this.http.post(this.domain + '/cauthentication/clogin', cuser);
  }

  logoutCustomer() {
    this.cauthToken = null;
    this.cuser = null;
    localStorage.clear();
  }
  storeCuserData(token, cuser) {
    localStorage.setItem('token', token);
    localStorage.setItem('cuser', JSON.stringify(cuser));
    this.cauthToken = token;
    this.cuser = cuser;
  }
  getProfile(): Observable<any> {
    this.loadTokenC();
    const headers = new HttpHeaders().set('Authorization', this.cauthToken);
    return this.http.get(this.domain + '/cauthentication/customerprofile', { headers });
  }
  searchBusiness(someSearch): Observable<any> {
    this.loadTokenC();
    const headers = new HttpHeaders().set('Authorization', this.cauthToken);
    let search = new HttpParams();
    search = search.append('category', someSearch.category);
    search = search.append('state', someSearch.state);
    // const category = someSearch.category;
    // const state = someSearch.state;
    return this.http.get( this.domain + '/cauthentication/search', {params: search, headers} );
  }
  searchBusinessP(): Observable<any> {
    this.loadTokenC();
    const headers = new HttpHeaders().set('Authorization', this.cauthToken);
    let search = new HttpParams();
    return this.http.get( this.domain + '/cauthentication/search/Photography', { headers} );
  }
  searchBusinessS(): Observable<any> {
    this.loadTokenC();
    const headers = new HttpHeaders().set('Authorization', this.cauthToken);
    let search = new HttpParams();
    return this.http.get( this.domain + '/cauthentication/search/Stylist', { headers} );
  }
  searchBusinessE(): Observable<any> {
    this.loadTokenC();
    const headers = new HttpHeaders().set('Authorization', this.cauthToken);
    let search = new HttpParams();
    return this.http.get( this.domain + '/cauthentication/search/Event Center', { headers} );
  }
  searchBusinessC(): Observable<any> {
    this.loadTokenC();
    const headers = new HttpHeaders().set('Authorization', this.cauthToken);
    let search = new HttpParams();
    return this.http.get( this.domain + '/cauthentication/search/Catering', { headers} );
  }
  searchBusinessM(): Observable<any> {
    this.loadTokenC();
    const headers = new HttpHeaders().set('Authorization', this.cauthToken);
    let search = new HttpParams();
    return this.http.get( this.domain + '/cauthentication/search/Makeup artist', { headers} );
  }
  searchBusinessMa(): Observable<any> {
    this.loadTokenC();
    const headers = new HttpHeaders().set('Authorization', this.cauthToken);
    let search = new HttpParams();
    return this.http.get( this.domain + '/cauthentication/search/MC', { headers} );
  }

}
