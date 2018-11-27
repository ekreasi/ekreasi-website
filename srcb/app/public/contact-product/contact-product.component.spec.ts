import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactProductComponent } from './contact-product.component';

describe('ContactProductComponent', () => {
  let component: ContactProductComponent;
  let fixture: ComponentFixture<ContactProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
