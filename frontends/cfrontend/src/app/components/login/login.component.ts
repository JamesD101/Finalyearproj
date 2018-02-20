import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { CauthService } from '../../services/cauth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  message: string;
  messageClass: string;
  processing = false;

  constructor(private formBuilder: FormBuilder,
              private cauthService: CauthService,
              private router: Router
  ) {
    this.cloginForm();
  }

  ngOnInit() {
  }

  cloginForm(){
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  disableForm(){
    this.form.controls['username'].disable();
    this.form.controls['password'].disable();
  }

  enableForm(){
    this.form.controls['username'].enable();
    this.form.controls['password'].enable();
  }

  onLoginCustomer(){
    this.processing = true;
    this.disableForm();
    const cuser = {
      username: this.form.get('username').value,
      password: this.form.get('password').value
    }
    this.cauthService.loginCustomer(cuser).subscribe(data => {
      if(!data.success){
        this.messageClass = 'alert alert-danger';
        this.message = data.message;
        this.enableForm();
      } else {
        this.messageClass = 'alert alert-success';
        this.message = data.message;
        this.cauthService.storeCuserData(data.token, data.cuser);
        setTimeout( () => {
          this.router.navigate(['/cdash']);
        }, 2000);
      }
    });

  }
}
