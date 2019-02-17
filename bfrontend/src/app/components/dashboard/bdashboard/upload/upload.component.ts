import { Component, OnInit, ElementRef, Input  } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BauthService } from '../../../../services/bauth.service';
import { Router, ActivatedRoute} from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Observable } from 'rxjs/Observable';
const URL = 'http://localhost:4000/bauthentication/upload';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  message: String;
  messageClass;
  domain = 'http://localhost:4000';
  infoid;
  selectedFile: File = null;
  yes = false;
  show = false;
  unshow = false;

  constructor(
    private bauth: BauthService,
    private flashMessagesService: FlashMessagesService,
    private http: HttpClient,
    private router: Router,
    private activated: ActivatedRoute
  ) { }

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
    this.yes = true;
    console.log(this.selectedFile);
  }
  onUpload(event){
    let formData:FormData = new FormData();
    formData.append('file', this.selectedFile, this.selectedFile.name);
    this.bauth.upload(this.infoid, formData).subscribe(function(data) {
     if (data.success) {
       alert(data.message);
      } else {
       alert(data.message);
      }
    });
  }
}
