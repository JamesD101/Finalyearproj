import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private router: Router) {
  }

  /*@HostListener ('window:unload')
  private onUnload(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('buser');
  }*/

  ngOnInit() {
    // this.router.navigate(['']);
  }
}
