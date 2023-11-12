import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TermsConditionsComponent } from './terms-conditions.component';
//Fondamentale in quanto il componente necessita di un altro
import { LogoCompleteComponent } from '../logo-complete/logo-complete.component';

describe('TermsConditionsComponent', () => {
  let component: TermsConditionsComponent;
  let fixture: ComponentFixture<TermsConditionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        TermsConditionsComponent,
        LogoCompleteComponent     //Fondamentale
      ]
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
