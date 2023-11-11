import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TermsConditionsComponent } from './terms-conditions.component';

describe('TermsConditionsComponent', () => {
  let component: TermsConditionsComponent;
  let fixture: ComponentFixture<TermsConditionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TermsConditionsComponent]
    });
    fixture = TestBed.createComponent(TermsConditionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  let check1 = '[TermsConditionsComponent] component creation';
  it(check1, () => {
    expect(component).toBeTruthy();
    console.log(check1 + " -> [OK]");
  });
});
