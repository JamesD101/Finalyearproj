import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CsignupComponent } from './csignup.component';

describe('CsignupComponent', () => {
  let component: CsignupComponent;
  let fixture: ComponentFixture<CsignupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CsignupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CsignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
