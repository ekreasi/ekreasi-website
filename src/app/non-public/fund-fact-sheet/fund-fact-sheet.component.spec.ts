import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FundFactsheetComponent } from './fund-fact-sheet.component';

describe('FundFactsheetComponent', () => {
  let component: FundFactsheetComponent;
  let fixture: ComponentFixture<FundFactsheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FundFactsheetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FundFactsheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
