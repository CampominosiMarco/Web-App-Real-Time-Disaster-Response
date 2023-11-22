import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistrationComponent } from './registration.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { FormControl } from '@angular/forms';

describe('RegistrationComponent', () => {
  let component: RegistrationComponent;
  let fixture: ComponentFixture<RegistrationComponent>;
  let debugElement: DebugElement;
  let tempControl:FormControl;
  let tempControl2:FormControl;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RegistrationComponent]
    });
    fixture = TestBed.createComponent(RegistrationComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  let check1 = '[RegistrationComponent] component creation';
  it(check1, () => {
    expect(component).toBeTruthy();
    console.log(check1 + " -> [OK]");
  });

  let check2 = '[RegistrationComponent] component FormControl test';
  it(check2, () => {
    console.log(check2 + ":");

    tempControl = component.regUserName;
    tempControl.setValue("TestUsername");
    expect(tempControl.valid).toBeTruthy();
    tempControl.setValue('');
    expect(tempControl.valid).toBeFalsy();
    tempControl.setValue('short');
    expect(tempControl.valid).toBeFalsy();
    console.log("regUserName -> [OK]");

    tempControl = component.regUserPrimaryEmail;
    tempControl.setValue('test.valid@example.com');
    expect(tempControl.valid).toBeTruthy();
    tempControl.setValue('');
    expect(tempControl.valid).toBeFalsy();
    tempControl.setValue('a@b.c');
    expect(tempControl.valid).toBeFalsy();
    tempControl.setValue('invalid-email');
    expect(tempControl.valid).toBeFalsy();
    console.log("regUserPrimaryEmail -> [OK]");

    tempControl.setValue('test@example.com');
    tempControl2 = component.regUserConfirmEmail;
    tempControl2.setValue('test@example.com');
    expect(component.formAll.controls.mails.valid).toBeTruthy();
    tempControl2.setValue('different@example.com');
    expect(component.formAll.controls.mails.valid).toBeFalsy();
    console.log("regUserPrimaryEmail + regUserConfirmEmail -> [OK]");

    tempControl = component.regUserMobile;
    tempControl.setValue('1234567890');
    expect(tempControl.valid).toBeTruthy();
    tempControl.setValue('');
    expect(tempControl.valid).toBeFalsy();
    tempControl.setValue('invalid');
    expect(tempControl.valid).toBeFalsy();
    console.log("regUserMobile -> [OK]");

    tempControl = component.regUserPrimaryPassword;
    tempControl.setValue('password123');
    expect(tempControl.valid).toBeTruthy();
    tempControl.setValue('');
    expect(tempControl.valid).toBeFalsy();
    tempControl.setValue('short');
    expect(tempControl.valid).toBeFalsy();
    console.log("regUserPrimaryPassword -> [OK]");

    tempControl.setValue('password123');
    tempControl2 = component.regUserConfirmPassword;
    tempControl2.setValue('password123');
    expect(component.formAll.controls.pass.valid).toBeTruthy();
    tempControl2.setValue('different-password');
    expect(component.formAll.controls.pass.valid).toBeFalsy();
    console.log("regUserPrimaryPassword + regUserConfirmPassword -> [OK]");

    tempControl = component.regUserAgree;
    tempControl.setValue(true);
    expect(tempControl.valid).toBeTruthy();
    tempControl.setValue(false);
    expect(tempControl.valid).toBeFalsy();
    console.log("regUserAgree -> [OK]");
  });


  let check3 = '[RegistrationComponent] HTML Error test';
  it(check3, () => {




//VOLEVO UN CONTROLLO DEL MESSAGGIO DI ERRORE COME QUESTO NON COME QUELLO SOTTO

    it('should display error messages for invalid user name input', () => {
      const userNameInput = element(by.id('userName'));
      userNameInput.sendKeys('short'); // Input non valido
    
      const errorMessage = element(by.css('.alert-danger'));
      expect(errorMessage.getText()).toContain('Lunghezza minima 8 caratteri');
    });
    
    it('should display error messages for invalid email input', () => {
      const emailInput = element(by.id('mail'));
      emailInput.sendKeys('invalidemail'); // Input non valido
    
      const errorMessage = element(by.css('.alert-danger'));
      expect(errorMessage.getText()).toContain('Email non conforme');
    });












//QUESTO TESTA LA VALIDITA? MA L?HO TESTATA SOPRA




  const userNameControl = component.formAll.get('name') as FormControl;
  expect(userNameControl.valid).toBeFalsy();

  userNameControl.setValue('short'); // Test with short length
  expect(userNameControl.errors?.minlength).toBeTruthy();

  userNameControl.setValue('longEnoughUsername'); // Test with valid length
  expect(userNameControl.valid).toBeTruthy();
});

it('should test email validation', () => {
  const mail1Control = component.formAll.get('mails.mail1') as FormControl;
  expect(mail1Control.valid).toBeFalsy();

  mail1Control.setValue('invalidemail'); // Test with invalid email
  expect(mail1Control.errors?.email).toBeTruthy();

  mail1Control.setValue('valid@mail.com'); // Test with valid email
  expect(mail1Control.valid).toBeTruthy();
});

it('should test matching emails validation', () => {
  const mail2Control = component.formAll.get('mails.mail2') as FormControl;
  expect(mail2Control.valid).toBeFalsy();

  mail2Control.setValue('invalidemail'); // Test with different email
  expect(mail2Control.errors?.matchMailError).toBeTruthy();

  mail2Control.setValue('valid@mail.com'); // Test with matching email
  expect(mail2Control.valid).toBeTruthy();
});

it('should test mobile number validation', () => {
  const mobileControl = component.formAll.get('mobile') as FormControl;
  expect(mobileControl.valid).toBeFalsy();

  mobileControl.setValue('invalidnumber'); // Test with invalid mobile number
  expect(mobileControl.errors?.pattern).toBeTruthy();

  mobileControl.setValue('1234567890'); // Test with valid mobile number
  expect(mobileControl.valid).toBeTruthy();
});

it('should test password validation', () => {
  const pass1Control = component.formAll.get('pass.pass1') as FormControl;
  expect(pass1Control.valid).toBeFalsy();

  pass1Control.setValue('short'); // Test with short password
  expect(pass1Control.errors?.minlength).toBeTruthy();

  pass1Control.setValue('longEnoughPassword'); // Test with valid password
  expect(pass1Control.valid).toBeTruthy();
});

it('should test matching passwords validation', () => {
  const pass2Control = component.formAll.get('pass.pass2') as FormControl;
  expect(pass2Control.valid).toBeFalsy();

  pass2Control.setValue('differentPassword'); // Test with different password
  expect(pass2Control.errors?.matchPasswordError).toBeTruthy();

  pass2Control.setValue('matchingPassword'); // Test with matching password
  expect(pass2Control.valid).toBeTruthy();
});







});
