import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderPageBlueComponent } from './header-page-blue.component';

describe('HeaderPageBlueComponent', () => {
  let component: HeaderPageBlueComponent;
  let fixture: ComponentFixture<HeaderPageBlueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderPageBlueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderPageBlueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
