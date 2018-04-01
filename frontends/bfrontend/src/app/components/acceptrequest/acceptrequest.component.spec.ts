import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptrequestComponent } from './acceptrequest.component';

describe('AcceptrequestComponent', () => {
  let component: AcceptrequestComponent;
  let fixture: ComponentFixture<AcceptrequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcceptrequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcceptrequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
