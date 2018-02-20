import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterservicesComponent } from './filterservices.component';

describe('FilterservicesComponent', () => {
  let component: FilterservicesComponent;
  let fixture: ComponentFixture<FilterservicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterservicesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterservicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
