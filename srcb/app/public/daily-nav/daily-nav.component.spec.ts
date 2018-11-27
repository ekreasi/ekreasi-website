import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyNavComponent } from './daily-nav.component';

describe('DailyNavComponent', () => {
  let component: DailyNavComponent;
  let fixture: ComponentFixture<DailyNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DailyNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DailyNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
