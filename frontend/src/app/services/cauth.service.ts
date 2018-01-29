import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CauthService {

  domain = 'http://localhost:8080';

  constructor( private http: HttpClient ) { }


  // this.search.append('category': this.category);
  // this.search.append('state', this.state);

  // const params = new HttpParams()
  //   .set(params: String,'category': this.category)
  //   .set(params: String,'state': this.state);

  registerCustomer(cuser): Observable<any> {
    return this.http.post(this.domain + '/authentication/cregister', cuser);
  }

  loginCustomer(cuser): Observable<any> {
    return this.http.post(this.domain + '/authentication/clogin', cuser);
  }

  // searchBusiness(someSearch): Observable<any> {
  //   const search = new HttpParams();
  //   search.set('category', someSearch.category);
  //   search.set('state', someSearch.state);
  //   return this.http.get(this.domain + '/authentication/search', {params: search} );
  // }

}
