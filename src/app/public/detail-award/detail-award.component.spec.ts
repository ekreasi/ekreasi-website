import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailAwardComponent } from './detail-award.component';

describe('DetailAwardComponent', () => {
  let component: DetailAwardComponent;
  let fixture: ComponentFixture<DetailAwardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailAwardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailAwardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
