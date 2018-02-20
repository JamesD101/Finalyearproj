import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BauthService } from '../../services/bauth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  blform: FormGroup;
  message: string;
  messageClass: string;
  processing = false;

  constructor(private formBuilder: FormBuilder, private bauthService: BauthService, private router: Router) {
    this.bloginForm();
  }

  ngOnInit() {
  }

  bloginForm(){
    this.blform = this.formBuilder.group({
      businessname: ['', Validators.compose([
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(50)
      ])],
      password: ['', Validators.required]
    });
  }

  disableForm(){
    this.blform.controls['businessname'].disable();
    this.blform.controls['password'].disable();
  }

  enableForm(){
    this.blform.controls['businessname'].enable();
    this.blform.controls['password'].enable();
  }

  onLoginBusiness(){
    this.processing = true;
    this.disableForm();
    const buser = {
      businessname: this.blform.get('businessname').value,
      password: this.blform.get('password').value
    }
    this.bauthService.loginBusiness(buser).subscribe(data => {
      if (!data.success){
        this.messageClass = 'alert alert-danger';
        this.message = data.message;
        this.processing = false;
        this.enableForm();
      } else {
        this.messageClass = 'alert alert-success';
        this.message = data.message;
        this.bauthService.storeUserData(data.token, data.buser);
        setTimeout (() => {
          this.router.navigate(['/bdash']);
        }, 2000);
      }
    });
  }

}
