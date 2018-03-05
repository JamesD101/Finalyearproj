import { Component, OnInit, ElementRef, Input  } from '@angular/core';
// import {  FileUploader } from 'ng2-file-upload/ng2-file-upload';
//define the constant url we would be uploading to.
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BauthService } from '../../../../services/bauth.service';
import { Router, ActivatedRoute} from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

const URL = 'http://localhost:4000/bauthentication/upload';


@Component({
  selector: 'app-profilepicupload',
  templateUrl: './profilepicupload.component.html',
  styleUrls: ['./profilepicupload.component.css']
})
export class ProfilepicuploadComponent implements OnInit {
  message: String;
  messageClass;
  domain = 'http://localhost:4000';
  infoid;
  selectedFile: File = null;

  constructor(private bauth: BauthService,  private flashMessagesService: FlashMessagesService, private http: HttpClient, private router: Router, private activated: ActivatedRoute ) { }

  ngOnInit() {

      this.bauth.getProfile().subscribe(profile => {
        if (!profile.success) {
          console.log('Error');
        } else {
          this.infoid = profile.buser._id;
          console.log(this.infoid);
          }
      });
    };

  onFileSelected(event){
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile);
  }
  onUpload(event){
      let formData:FormData = new FormData();
      formData.append('photo', this.selectedFile, this.selectedFile.name);
      this.http.post(this.domain + '/bauthentication/upload/' + this.infoid, formData ).subscribe(function(data) {
        if (data) {
          // this.flashMessagesService.show('Profile Picture Uploaded', {cssClass: 'alert-info'});
        } else {
          // this.flashMessagesService.show('An Error Occurred', {cssClass: 'alert-danger'});
        }
      });
  }
}
