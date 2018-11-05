import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartRupiahEquityFundComponent } from './chart-rupiah-equity-fund.component';

describe('ChartRupiahEquityFundComponent', () => {
  let component: ChartRupiahEquityFundComponent;
  let fixture: ComponentFixture<ChartRupiahEquityFundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartRupiahEquityFundComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartRupiahEquityFundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
