import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReimbursementTrackingDetailComponent } from './reimbursement-tracking-detail.component';

describe('ReimbursementTrackingDetailComponent', () => {
  let component: ReimbursementTrackingDetailComponent;
  let fixture: ComponentFixture<ReimbursementTrackingDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReimbursementTrackingDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReimbursementTrackingDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
