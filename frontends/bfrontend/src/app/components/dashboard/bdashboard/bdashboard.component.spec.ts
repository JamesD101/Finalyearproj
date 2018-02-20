import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BdashboardComponent } from './bdashboard.component';

describe('BdashboardComponent', () => {
  let component: BdashboardComponent;
  let fixture: ComponentFixture<BdashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BdashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BdashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
