import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderPageGreenComponent } from './header-page-green.component';

describe('HeaderPageGreenComponent', () => {
  let component: HeaderPageGreenComponent;
  let fixture: ComponentFixture<HeaderPageGreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderPageGreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderPageGreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
