import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuDashboardHorizontalComponent } from './menu-dashboard-horizontal.component';

describe('MenuDashboardHorizontalComponent', () => {
  let component: MenuDashboardHorizontalComponent;
  let fixture: ComponentFixture<MenuDashboardHorizontalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuDashboardHorizontalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuDashboardHorizontalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
