import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-bsignup',
  templateUrl: './bsignup.component.html',
  styleUrls: ['./bsignup.component.css']
})
export class BsignupComponent implements OnInit {

  brform: FormGroup;
  message: String;
  messageClass;
  processing = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {
    this.createForm();
  }


  ngOnInit() {
  }

  createForm() {
    this.brform = this.formBuilder.group({
      fullname: ['', Validators.compose([
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
      businessname: ['', Validators.compose([
        Validators.required
      ])],
      category: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
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
    this.brform.controls['fullname'].disable();
    this.brform.controls['email'].disable();
    this.brform.controls['businessname'].disable();
    this.brform.controls['category'].disable();
    this.brform.controls['address'].disable();
    this.brform.controls['city'].disable();
    this.brform.controls['state'].disable();
    this.brform.controls['password'].disable();
    this.brform.controls['confirm'].disable();
  }

  enableForm(){
    this.brform.controls['fullname'].enable();
    this.brform.controls['email'].enable();
    this.brform.controls['businessname'].enable();
    this.brform.controls['category'].enable();
    this.brform.controls['address'].enable();
    this.brform.controls['city'].enable();
    this.brform.controls['state'].enable();
    this.brform.controls['password'].enable();
    this.brform.controls['confirm'].enable();
  }

  onRegisterBusiness() {
    this.processing = true;
    this.disableForm();
    const buser = {
      fullname: this.brform.get('fullname').value,
      email: this.brform.get('email').value,
      businessname: this.brform.get('businessname').value,
      category: this.brform.get('category').value,
      address: this.brform.get('address').value,
      city: this.brform.get('city').value,
      state: this.brform.get('state').value,
      password: this.brform.get('password').value
    };
    this.authService.registerBusiness(buser).subscribe( data => {
      if (!data.success) {
        this.messageClass = 'alert alert-danger';
        this.message = data.message;
        this.processing = false;
        this.enableForm();
      } else {
        this.messageClass = 'alert alert-success';
        this.message = data.message;
      }
    });
  }


}
