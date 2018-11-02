import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderPageRedComponent } from './header-page-red.component';

describe('HeaderPageRedComponent', () => {
  let component: HeaderPageRedComponent;
  let fixture: ComponentFixture<HeaderPageRedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderPageRedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderPageRedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
