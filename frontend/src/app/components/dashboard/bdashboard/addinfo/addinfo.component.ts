import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { BauthService } from '../../../../services/bauth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addinfo',
  templateUrl: './addinfo.component.html',
  styleUrls: ['./addinfo.component.css']
})
export class AddinfoComponent implements OnInit {

  editform: FormGroup;
  message: String;
  messageClass;
  processing = false;

  constructor(
    private formBuilder: FormBuilder,
    private bauthService: BauthService,
    private router: Router
  ) {
    this.createForm();
  }

  ngOnInit() {
  }

  createForm(){
    this.editform = this.formBuilder.group({
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
      aboutme: ['', Validators.required],
      profilepic: ['']
    });
  }

  validateEmail(controls) {
    const regExp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    if (regExp.test(controls.value)) {
      return null;
    } else {
      return { 'validateEmail': true};
    }
  }

  disableForm(){
    this.editform.controls['fullname'].disable();
    this.editform.controls['email'].disable();
    this.editform.controls['businessname'].disable();
    this.editform.controls['category'].disable();
    this.editform.controls['address'].disable();
    this.editform.controls['city'].disable();
    this.editform.controls['state'].disable();
    this.editform.controls['password'].disable();
    this.editform.controls['confirm'].disable();
  }

  enableForm(){
    this.editform.controls['fullname'].enable();
    this.editform.controls['email'].enable();
    this.editform.controls['businessname'].enable();
    this.editform.controls['category'].enable();
    this.editform.controls['address'].enable();
    this.editform.controls['city'].enable();
    this.editform.controls['state'].enable();
    this.editform.controls['password'].enable();
    this.editform.controls['confirm'].enable();
  }
}
