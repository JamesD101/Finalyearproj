import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  brform: FormGroup;
  message: String;
  messageClass;
  processing = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.createForm();
  }


  ngOnInit() {
  }

  createForm() {
    this.brform = this.formBuilder.group({
      username: ['', Validators.compose([
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(70)
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

  passwordValidate(controls) {
    const regExp = new RegExp(/^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[\d])(?=.*?[\W]).{8,35}$/);
    if (regExp.test(controls.value)) {
      return null;
    } else {
      return { 'passwordValidate' : true };
    }
  }

  disableForm(){
    this.brform.controls['username'].disable();
    this.brform.controls['password'].disable();
    this.brform.controls['confirm'].disable();
  }

  enableForm(){
    this.brform.controls['username'].enable();
    this.brform.controls['password'].enable();
    this.brform.controls['confirm'].enable();
  }

  onRegister() {
    this.processing = true;
    this.disableForm();
    const auser = {
      username: this.brform.get('username').value,
      password: this.brform.get('password').value
    };
    this.authService.registerUser(auser).subscribe( data => {
      if (!data.success) {
        this.messageClass = 'alert alert-danger';
        this.message = data.message;
        this.processing = false;
        this.enableForm();
      } else {
        this.messageClass = 'alert alert-success';
        this.message = data.message;
        setTimeout( () => {
          this.router.navigate(['/login']);
        }, 2000);
      }
    });
  }


}
