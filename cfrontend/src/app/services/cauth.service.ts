import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { tokenNotExpired } from 'angular2-jwt';
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

  constructor( private http: HttpClient) { }

  loggedInC() {
    return tokenNotExpired();
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

  singleServiceProvider(id): Observable<any> {
    return this.http.get(this.domain + 'cauthentication/singleserviceprovider/' + id);
  }
  onlyServiceProvider(businessname): Observable<any> {
    return this.http.get(this.domain + 'cauthentication/onlyserviceprovider/' + businessname);
  }
  sendRequest(essRequest): Observable<any>{
    this.loadTokenC();
    const headers = new HttpHeaders().set('Authorization', this.cauthToken);
    return this.http.post(this.domain + '/cauthentication/request', essRequest, {headers});
  }
  sendRrequest(essRequest): Observable<any>{
    this.loadTokenC();
    const headers = new HttpHeaders().set('Authorization', this.cauthToken);
    return this.http.post(this.domain + '/cauthentication/rrequest', essRequest,{headers});
  }
  changeStatus(id): Observable<any> {
    this.loadTokenC();
    const headers = new HttpHeaders().set('Authorization', this.cauthToken);
    return this.http.post(this.domain + '/cauthentication/changestatus/' + id, {headers});
  }
  checkRequest(id): Observable<any> {
    this.loadTokenC();
    const headers = new HttpHeaders().set('Authorization', this.cauthToken);
    // let  currentId = new HttpParams();
    // currentId = currentId.set('_id', id);
    return this.http.get(this.domain + '/cauthentication/checkrequest/' + id, {headers});
  }
  checkconRequest(id): Observable<any> {
    this.loadTokenC();
    const headers = new HttpHeaders().set('Authorization', this.cauthToken);
    // let  currentId = new HttpParams();
    // currentId = currentId.set('_id', id);
    return this.http.get(this.domain + '/cauthentication/checkconrequest/' + id, {headers});
  }
  checkconfirmedRequest(id): Observable<any> {
    this.loadTokenC();
    const headers = new HttpHeaders().set('Authorization', this.cauthToken);
    // let  currentId = new HttpParams();
    // currentId = currentId.set('_id', id);
    return this.http.get(this.domain + '/cauthentication/confirmedrequest/' + id, {headers});
  }
  checkBRequest(id): Observable<any> {
    // this.loadTokenC();
    // const headers = new HttpHeaders().set('Authorization', this.cauthToken);
    return this.http.get(this.domain + '/cauthentication/checkbrequest/' + id);
  }
  checkconfirmedBRequest(id): Observable<any> {
    // this.loadTokenC();
    // const headers = new HttpHeaders().set('Authorization', this.cauthToken);
    return this.http.get(this.domain + '/cauthentication/confirmedbrequest/' + id);
  }
  deleteReq(id): Observable<any>{
    this.loadTokenC();
    const headers = new HttpHeaders().set('Authorization', this.cauthToken);
    return this.http.get(this.domain + '/cauthentication/deleterequest/' + id, {headers});
  }
  getSingleReq(id): Observable<any> {
    this.loadTokenC();
    const headers = new HttpHeaders().set('Authorization', this.cauthToken);
    return this.http.get(this.domain + '/cauthentication/singlereq/' + id, {headers});
  }
  logoutCustomer() {
    this.cauthToken = null;
    this.cuser = null;
    localStorage.clear();
  }
  addReview(reviews): Observable<any>{
    this.loadTokenC();
    const headers = new HttpHeaders().set('Authorization', this.cauthToken);
    return this.http.post(this.domain + '/cauthentication/addreviews', reviews, { headers });
  }
  getReviews(id): Observable<any> {
    // this.loadTokenC();
    // const headers = new HttpHeaders().set('Authorization', this.cauthToken);
    return this.http.get(this.domain + '/cauthentication/getreviews/' + id);
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
  searchAll(category): Observable<any> {
    return this.http.get(this.domain + '/cauthentication/search/' + category);
  }
  searchBusiness(someSearch): Observable<any> {
    let search = new HttpParams();
    search = search.append('category', someSearch.category);
    search = search.append('state', someSearch.state);
    return this.http.get( this.domain + '/cauthentication/search', { params: search } );
  }
  searchBusinessP(): Observable<any> {
    return this.http.get( this.domain + '/cauthentication/directservice/Photography' );
  }
  searchBusinessS(): Observable<any> {
    return this.http.get( this.domain + '/cauthentication/directservice/Stylist' );
  }
  searchBusinessE(): Observable<any> {
    return this.http.get( this.domain + '/cauthentication/directservice/Eventcenter' );
  }
  searchBusinessC(): Observable<any> {
    return this.http.get( this.domain + '/cauthentication/directservice/Catering' );
  }
  searchBusinessM(): Observable<any> {
    return this.http.get( this.domain + '/cauthentication/directservice/Makeupartist' );
  }
  searchBusinessMa(): Observable<any> {
    return this.http.get( this.domain + '/cauthentication/directservice/MC' );
  }
  getUploadPics(id): Observable<any> {
    return this.http.get(this.domain + '/cauthentication/getworks/'+ id);
  }
  addtoViews(id): Observable<any> {
    this.loadTokenC();
    const headers = new HttpHeaders().set('Authorization', this.cauthToken);
    return this.http.put(this.domain + '/cauthentication/addtoviews/' + id, {headers});
  }
  hirepro(id): Observable<any> {
    this.loadTokenC();
    const headers = new HttpHeaders().set('Authorization', this.cauthToken);
    return this.http.get(this.domain + '/cauthentication/getforhire/'+ id, {headers});
  }

}
