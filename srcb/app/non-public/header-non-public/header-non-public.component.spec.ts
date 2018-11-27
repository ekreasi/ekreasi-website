import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderNonPublicComponent } from './header-non-public.component';

describe('HeaderNonPublicComponent', () => {
  let component: HeaderNonPublicComponent;
  let fixture: ComponentFixture<HeaderNonPublicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderNonPublicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderNonPublicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
