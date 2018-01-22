import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CauthService {

  domain = 'http://localhost:8080';

  constructor( private http: HttpClient ) { }


  registerCustomer(cuser): Observable<any>  {
    return this.http.post(this.domain + '/authentication/cregister', cuser);
  }

  loginCustomer(cuser): Observable<any> {
    return this.http.post(this.domain + '/authentication/clogin', cuser);
  }

}
