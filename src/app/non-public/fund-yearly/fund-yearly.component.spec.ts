import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FundYearlyComponent } from './fund-yearly.component';

describe('FundYearlyComponent', () => {
  let component: FundYearlyComponent;
  let fixture: ComponentFixture<FundYearlyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FundYearlyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FundYearlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
