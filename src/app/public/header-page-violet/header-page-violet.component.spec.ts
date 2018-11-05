import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderPageVioletComponent } from './header-page-violet.component';

describe('HeaderPageVioletComponent', () => {
  let component: HeaderPageVioletComponent;
  let fixture: ComponentFixture<HeaderPageVioletComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderPageVioletComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderPageVioletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
