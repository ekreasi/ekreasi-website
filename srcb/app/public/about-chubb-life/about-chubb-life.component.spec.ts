import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutChubbLifeComponent } from './about-chubb-life.component';

describe('AboutChubbLifeComponent', () => {
  let component: AboutChubbLifeComponent;
  let fixture: ComponentFixture<AboutChubbLifeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutChubbLifeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutChubbLifeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
