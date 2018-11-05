import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderPageToscaComponent } from './header-page-tosca.component';

describe('HeaderPageToscaComponent', () => {
  let component: HeaderPageToscaComponent;
  let fixture: ComponentFixture<HeaderPageToscaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderPageToscaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderPageToscaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
