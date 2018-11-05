import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FundMonthlyComponent } from './fund-monthly.component';

describe('FundMonthlyComponent', () => {
  let component: FundMonthlyComponent;
  let fixture: ComponentFixture<FundMonthlyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FundMonthlyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FundMonthlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
