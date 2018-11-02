import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EducationCenterComponent } from './education-center.component';

describe('EducationCenterComponent', () => {
  let component: EducationCenterComponent;
  let fixture: ComponentFixture<EducationCenterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EducationCenterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EducationCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
