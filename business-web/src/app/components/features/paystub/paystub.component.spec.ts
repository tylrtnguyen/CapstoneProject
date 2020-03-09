import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaystubComponent } from './paystub.component';

describe('PaystubComponent', () => {
  let component: PaystubComponent;
  let fixture: ComponentFixture<PaystubComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaystubComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaystubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
