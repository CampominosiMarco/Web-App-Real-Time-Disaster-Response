import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let debugElement: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [ HttpClientModule, FormsModule ]
    });
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  let check1 = '[LoginComponent] component creation';
  it(check1, () => {
    expect(component).toBeTruthy();
    console.log(check1 + " -> [OK]");
  });

  let check2 = '[LoginComponent] Server Alert test';
  it(check2, () => {

    let currentAlert: HTMLElement;

    component.logUserAlert = '';
    fixture.detectChanges();
    currentAlert = fixture.nativeElement.querySelector('#serveralert');
    expect(currentAlert).toBeNull();

    component.logUserAlert = 'AlertTest';
    fixture.detectChanges();
    currentAlert = fixture.nativeElement.querySelector('#serveralert');
    expect(currentAlert.textContent).toContain('AlertTest');

    console.log(check2 + " -> [OK]");
  });

  let check3 = '[LoginComponent] Button test';
  it(check3, () => {

    const buttonElement= fixture.debugElement.query(By.css('button')).nativeElement;

    component.logUser = '';
    component.logPassword = '';
    fixture.detectChanges();
    expect(buttonElement.disabled).toBeTrue();

    component.logUser = 'UserTest';
    fixture.detectChanges();
    expect(buttonElement.disabled).toBeTrue();

    component.logUser = '';
    component.logPassword = 'PasswordTest';
    fixture.detectChanges();
    expect(buttonElement.disabled).toBeTrue();

    component.logUser = 'UserTest';
    fixture.detectChanges();
    expect(buttonElement.disabled).toBeFalse();

    console.log(check3 + " -> [OK]");
  });
});