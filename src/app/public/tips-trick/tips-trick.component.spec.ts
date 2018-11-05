import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TipsTrickComponent } from './tips-trick.component';

describe('TipsTrickComponent', () => {
  let component: TipsTrickComponent;
  let fixture: ComponentFixture<TipsTrickComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipsTrickComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipsTrickComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
