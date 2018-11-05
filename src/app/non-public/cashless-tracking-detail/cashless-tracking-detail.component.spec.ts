import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CashlessTrackingDetailComponent } from './cashless-tracking-detail.component';

describe('CashlessTrackingDetailComponent', () => {
  let component: CashlessTrackingDetailComponent;
  let fixture: ComponentFixture<CashlessTrackingDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CashlessTrackingDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CashlessTrackingDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
