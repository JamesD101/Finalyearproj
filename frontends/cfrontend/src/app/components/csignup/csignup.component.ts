import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { CauthService } from '../../services/cauth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-csignup',
  templateUrl: './csignup.component.html',
  styleUrls: ['./csignup.component.css']
})
export class CsignupComponent implements OnInit {

  crform: FormGroup;
  message: String;
  messageClass;
  processing = false;
  emailValid;
  emailMessage;
  usernameValid;
  usernameMessage;


  constructor( private formBuilder: FormBuilder,
               private router: Router,
               private cauthService: CauthService ) {
    this.createForm();
  }


  ngOnInit() {
  }

  createForm() {
    this.crform = this.formBuilder.group({
      username: ['', Validators.compose([
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(70)
      ])],
      email: ['', Validators.compose([
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(50),
        this.validateEmail
      ])],

      password: ['', Validators.compose([
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(30),
        this.passwordValidate
      ])],
      confirm: ['', Validators.compose([
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(30)
      ])]
    }, { validator: this.matchingPasswords('password', 'confirm')});
  }

  matchingPasswords(password, confirm) {
    return (group: FormGroup) => {
      if (group.controls[password].value === group.controls[confirm].value){
        return null;
      } else {
        return { 'matchingPassword' : true};
      }
    };
  }
  validateEmail(controls) {
    const regExp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    if (regExp.test(controls.value)) {
      return null;
    } else {
      return { 'validateEmail': true};
    }
  }

  passwordValidate(controls) {
    const regExp = new RegExp(/^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[\d])(?=.*?[\W]).{8,35}$/);
    if (regExp.test(controls.value)) {
      return null;
    } else {
      return { 'passwordValidate' : true };
    }
  }

  disableForm(){
    this.crform.controls['username'].disable();
    this.crform.controls['email'].disable();
    this.crform.controls['password'].disable();
  }

  enableForm(){
    this.crform.controls['username'].enable();
    this.crform.controls['email'].enable();
    this.crform.controls['password'].enable();
  }

  onRegisterCustomer() {
    this.processing = true;
    this.disableForm();
    const cuser = {
      username: this.crform.get('username').value,
      email: this.crform.get('email').value,
      password: this.crform.get('password').value
    };
    // console.log(cuser);
    this.cauthService.registerCustomer(cuser).subscribe( data => {
      if (!data.success) {
        this.messageClass = 'alert alert-danger';
        this.message = data.message;
        this.processing = false;
        this.enableForm();
      } else {
        this.messageClass = 'alert alert-success';
        this.message = data.message;
        this.router.navigate(['/login/clogin']);
      }
    });
  }

  /*checkCemail(email){
    this.CauthService.checkCEmail(this.crform.get('email').value).subscribe(data => {
      if (!data.success) {
        this.emailValid = false;
        this.emailMessage = data.message;
      } else {
        this.emailValid = true;
        this.emailMessage = data.message;
      }
    });
  }

  checkCusername(username){
    this.CauthService.checkUsername(this.crform.get('username').value).subscribe( data => {
      if (!data.success) {
        this.usernameValid = false;
        this.usernameMessage = data.message;

      } else {
        this.usernameValid = true;
        this.usernameMessage = data.message;
      }
    });
  }
*/

}
