import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilepicuploadComponent } from './profilepicupload.component';

describe('ProfilepicuploadComponent', () => {
  let component: ProfilepicuploadComponent;
  let fixture: ComponentFixture<ProfilepicuploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfilepicuploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilepicuploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
