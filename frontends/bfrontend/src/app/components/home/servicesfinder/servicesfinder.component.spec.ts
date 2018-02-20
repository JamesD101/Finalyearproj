import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicesfinderComponent } from './servicesfinder.component';

describe('ServicesfinderComponent', () => {
  let component: ServicesfinderComponent;
  let fixture: ComponentFixture<ServicesfinderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServicesfinderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicesfinderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
