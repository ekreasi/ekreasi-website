import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDownloadsComponent } from './form-downloads.component';

describe('FormDownloadsComponent', () => {
  let component: FormDownloadsComponent;
  let fixture: ComponentFixture<FormDownloadsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormDownloadsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormDownloadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
