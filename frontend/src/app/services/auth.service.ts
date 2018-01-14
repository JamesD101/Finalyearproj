import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {

  domain = 'http://localhost:8080';


  constructor(private http: HttpClient) { }

  registerBusiness(buser) {
  return this.http.post<Buser>(this.domain + '/authentication/bregister', buser);
  }
  registerCustomer(cuser) {
    return this.http.post(this.domain + '/authentication/cregister', cuser);
  }
  loginCustomer(cuser){
    return this.http.post(this.domain + '/authentication/clogin', cuser);
  }
  loginBusiness(buser){
    return this.http.post(this.domain + '/authentication/blogin', buser);
  }

}
