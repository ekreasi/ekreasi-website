import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficeNetworkComponent } from './office-network.component';

describe('OfficeNetworkComponent', () => {
  let component: OfficeNetworkComponent;
  let fixture: ComponentFixture<OfficeNetworkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfficeNetworkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfficeNetworkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
