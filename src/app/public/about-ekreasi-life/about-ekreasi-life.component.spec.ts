import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutekreasiLifeComponent } from './about-ekreasi-life.component';

describe('AboutekreasiLifeComponent', () => {
  let component: AboutekreasiLifeComponent;
  let fixture: ComponentFixture<AboutekreasiLifeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutekreasiLifeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutekreasiLifeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
