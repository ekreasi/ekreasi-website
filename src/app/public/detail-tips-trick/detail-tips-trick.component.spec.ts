import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailTipsTrickComponent } from './detail-tips-trick.component';

describe('DetailTipsTrickComponent', () => {
  let component: DetailTipsTrickComponent;
  let fixture: ComponentFixture<DetailTipsTrickComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailTipsTrickComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailTipsTrickComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
