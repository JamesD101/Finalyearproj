import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { BauthService } from '../../../../services/bauth.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';


@Component({
  selector: 'app-addinfo',
  templateUrl: './addinfo.component.html',
  styleUrls: ['./addinfo.component.css']
})
export class AddinfoComponent implements OnInit {

  editForm: FormGroup;
  message: String;
  messageClass;
  processing = false;
  info = {};
  fullname;
  businessname;
  description;
  hold= true;
  _id;

  constructor(
    private formBuilder: FormBuilder,
    private bauthService: BauthService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.createForm();
  }


  ngOnInit() {
   this.bauthService.getProfile().subscribe(profile => {
     if (!profile.success) {
       console.log('Error');
     } else {
       this.info = profile.buser;
       console.log(this.info);
     }
   });


  }

  updateUserInfo() {
    const newbuser = {
      businessname: this.editForm.get('businessname').value,
      description: this.editForm.get('description').value
    };
    this.bauthService.editBuserInfo(newbuser).subscribe(data => {
      if (!data.success) {
        this.messageClass = 'alert alert-danger';
        this.message = data.message;
      } else {
        this.messageClass = 'alert alert-success';
        this.message = data.message;
        window.location.reload();
      }
    });
  }

  createForm() {
    this.editForm = this.formBuilder.group({
      businessname: ['', Validators.compose([
        Validators.required
      ])],
      description: ['', Validators.compose([
        Validators.minLength(5),
        Validators.maxLength(130),
        Validators.required
      ])]
    });
    this.editForm.controls['businessname'].disable();
  }

}
