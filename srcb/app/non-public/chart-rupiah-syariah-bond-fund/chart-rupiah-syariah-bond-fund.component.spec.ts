import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartRupiahSyariahBondFundComponent } from './chart-rupiah-syariah-bond-fund.component';

describe('ChartRupiahSyariahBondFundComponent', () => {
  let component: ChartRupiahSyariahBondFundComponent;
  let fixture: ComponentFixture<ChartRupiahSyariahBondFundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartRupiahSyariahBondFundComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartRupiahSyariahBondFundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
