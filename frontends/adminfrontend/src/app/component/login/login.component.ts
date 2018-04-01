import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  aform: FormGroup;
  message: string;
  messageClass: string;
  processing = false;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {
    this.bloginForm();
  }

  ngOnInit() {
  }

  bloginForm(){
    this.aform = this.formBuilder.group({
      username: ['', Validators.compose([
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(50)
      ])],
      password: ['', Validators.required]
    });
  }

  disableForm(){
    this.aform.controls['username'].disable();
    this.aform.controls['password'].disable();
  }

  enableForm(){
    this.aform.controls['username'].enable();
    this.aform.controls['password'].enable();
  }

  onLoginUser(){
    this.processing = true;
    this.disableForm();
    const auser = {
      username: this.aform.get('username').value,
      password: this.aform.get('password').value
    }
    this.authService.loginUser(auser).subscribe(data => {
      if (!data.success){
        this.messageClass = 'alert alert-danger';
        this.message = data.message;
        this.processing = false;
        this.enableForm();
      } else {
        this.messageClass = 'alert alert-success';
        this.message = data.message;
        this.authService.storeUserData(data.token, data.auser);
        setTimeout (() => {
          this.router.navigate(['/dashboard']);
        }, 2000);
      }
    });
  }

}
