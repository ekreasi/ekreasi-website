import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderPageOrangeComponent } from './header-page-orange.component';

describe('HeaderPageOrangeComponent', () => {
  let component: HeaderPageOrangeComponent;
  let fixture: ComponentFixture<HeaderPageOrangeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderPageOrangeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderPageOrangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
