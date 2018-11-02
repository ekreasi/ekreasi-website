import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuDashboardVerticalComponent } from './menu-dashboard-vertical.component';

describe('MenuDashboardVerticalComponent', () => {
  let component: MenuDashboardVerticalComponent;
  let fixture: ComponentFixture<MenuDashboardVerticalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuDashboardVerticalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuDashboardVerticalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
