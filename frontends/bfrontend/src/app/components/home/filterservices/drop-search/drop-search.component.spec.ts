import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DropSearchComponent } from './drop-search.component';

describe('DropSearchComponent', () => {
  let component: DropSearchComponent;
  let fixture: ComponentFixture<DropSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DropSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DropSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
