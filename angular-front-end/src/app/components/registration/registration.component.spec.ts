import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistrationComponent } from './registration.component';
import { DebugElement } from '@angular/core';
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
    console.log("***** regUserName -> [OK]");

    tempControl = component.regUserPrimaryEmail;
    tempControl.setValue('test.valid@example.com');
    expect(tempControl.valid).toBeTruthy();
    tempControl.setValue('');
    expect(tempControl.valid).toBeFalsy();
    tempControl.setValue('a@b.c');
    expect(tempControl.valid).toBeFalsy();
    tempControl.setValue('invalid-email');
    expect(tempControl.valid).toBeFalsy();
    console.log("***** regUserPrimaryEmail -> [OK]");

    tempControl.setValue('test@example.com');
    tempControl2 = component.regUserConfirmEmail;
    tempControl2.setValue('test@example.com');
    expect(component.formAll.controls.mails.valid).toBeTruthy();
    tempControl2.setValue('different@example.com');
    expect(component.formAll.controls.mails.valid).toBeFalsy();
    console.log("***** regUserPrimaryEmail + regUserConfirmEmail -> [OK]");

    tempControl = component.regUserMobile;
    tempControl.setValue('1234567890');
    expect(tempControl.valid).toBeTruthy();
    tempControl.setValue('');
    expect(tempControl.valid).toBeFalsy();
    tempControl.setValue('invalid');
    expect(tempControl.valid).toBeFalsy();
    console.log("***** regUserMobile -> [OK]");

    tempControl = component.regUserPrimaryPassword;
    tempControl.setValue('password123');
    expect(tempControl.valid).toBeTruthy();
    tempControl.setValue('');
    expect(tempControl.valid).toBeFalsy();
    tempControl.setValue('short');
    expect(tempControl.valid).toBeFalsy();
    console.log("***** regUserPrimaryPassword -> [OK]");

    tempControl.setValue('password123');
    tempControl2 = component.regUserConfirmPassword;
    tempControl2.setValue('password123');
    expect(component.formAll.controls.pass.valid).toBeTruthy();
    tempControl2.setValue('different-password');
    expect(component.formAll.controls.pass.valid).toBeFalsy();
    console.log("***** regUserPrimaryPassword + regUserConfirmPassword -> [OK]");

    tempControl = component.regUserAgree;
    tempControl.setValue(true);
    expect(tempControl.valid).toBeTruthy();
    tempControl.setValue(false);
    expect(tempControl.valid).toBeFalsy();
    console.log("***** regUserAgree -> [OK]");
  });

  function htmlTest(inputElement: any, testValue: string, idTest: string){
    inputElement.value = testValue;
    inputElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    return fixture.nativeElement.querySelector(idTest);
  }

  let check3 = '[RegistrationComponent] HTML Error test';
  it(check3, () => {
    console.log(check3 + ":");

    //These are manadatory for alert view
    component.regUserName.markAsTouched();
    component.regUserPrimaryEmail.markAsTouched();
    component.regUserConfirmEmail.markAsTouched();
    component.regUserMobile.markAsTouched();
    component.regUserPrimaryPassword.markAsTouched();
    component.regUserConfirmPassword.markAsTouched();
    component.regUserAgree.setValue(true);

    let currentAlert: HTMLElement;


//userNameInput
    const userNameInput = fixture.nativeElement.querySelector('#userName');

    currentAlert = htmlTest(userNameInput, '', '#userNameAlert')    //required
    expect(currentAlert.textContent).toContain('Obbligatorio!');

    currentAlert = htmlTest(userNameInput, 'short', '#userNameAlert')    //minlength
    expect(currentAlert.textContent).toContain('Lunghezza minima 8 caratteri!');

    currentAlert = htmlTest(userNameInput, 'longEnoughUsername', '#userNameAlert')    // ok value
    expect(currentAlert).toBeNull();
    console.log("***** userName -> [OK]");


//userNameInput
    const mailInput = fixture.nativeElement.querySelector('#mail');

    currentAlert = htmlTest(mailInput, '', '#mailAlert')    //required
    expect(currentAlert.textContent).toContain('Obbligatorio!');

    currentAlert = htmlTest(mailInput, 'short', '#mailAlert')    //minlength
    expect(currentAlert.textContent).toContain('Lunghezza minima 6 caratteri!');

    currentAlert = htmlTest(mailInput, 'm.c@sss', '#mailAlert')    //pattern
    expect(currentAlert.textContent).toContain('Email non conforme!');

    currentAlert = htmlTest(mailInput, 'first@mail.com', '#mailAlert')    //ok value
    expect(currentAlert).toBeNull();
    console.log("***** mail -> [OK]");
    

//mail2Input
    const mail2Input = fixture.nativeElement.querySelector('#mail2');

    currentAlert = htmlTest(mail2Input, '', '#mail2Alert')    //required
    expect(currentAlert.textContent).toContain('Obbligatorio!');

    currentAlert = htmlTest(mail2Input, 'short', '#mail2Alert')    //minlength
    expect(currentAlert.textContent).toContain('Lunghezza minima 6 caratteri!');

    currentAlert = htmlTest(mail2Input, 'm.c@sss', '#mail2Alert')    //pattern
    expect(currentAlert.textContent).toContain('Email non conforme!');

    currentAlert = htmlTest(mail2Input, 'different@mail.com', '#mail2Alert')    //matchMailError
    expect(currentAlert.textContent).toContain('Email non confermata!');

    currentAlert = htmlTest(mail2Input, 'first@mail.com', '#mail2Alert')    //ok value
    expect(currentAlert).toBeNull();
    console.log("***** mail2 -> [OK]");

    
//mobilePhone
    const mobileInput = fixture.nativeElement.querySelector('#mobilePhone');

    currentAlert = htmlTest(mobileInput, '', '#mobilePhoneAlert')    //required
    expect(currentAlert.textContent).toContain('Obbligatorio!');

    currentAlert = htmlTest(mobileInput, '123456A6789', '#mobilePhoneAlert')    //pattern
    expect(currentAlert.textContent).toContain('Cellulare non conforme!');

    currentAlert = htmlTest(mobileInput, '1234567890', '#mobilePhoneAlert')    //ok value
    expect(currentAlert).toBeNull();
    console.log("***** mobilePhone -> [OK]");


//passInput
    const passInput = fixture.nativeElement.querySelector('#pass');

    currentAlert = htmlTest(passInput, '', '#passAlert')    //required
    expect(currentAlert.textContent).toContain('Obbligatorio!');

    currentAlert = htmlTest(passInput, 'short88', '#passAlert')    //minlength
    expect(currentAlert.textContent).toContain('Lunghezza minima 8 caratteri!');

    currentAlert = htmlTest(passInput, 'Pa$5word', '#passAlert')    //ok value
    expect(currentAlert).toBeNull();
    console.log("***** pass -> [OK]");


//passCheckInput
    const passCheckInput = fixture.nativeElement.querySelector('#passCheck');

    currentAlert = htmlTest(passCheckInput, '', '#passCheckAlert')    //required
    expect(currentAlert.textContent).toContain('Obbligatorio!');

    currentAlert = htmlTest(passCheckInput, 'short88', '#passCheckAlert')    //minlength
    expect(currentAlert.textContent).toContain('Lunghezza minima 8 caratteri!');
    
    currentAlert = htmlTest(passCheckInput, 'Different', '#passCheckAlert')    //matchPasswordError
    expect(currentAlert.textContent).toContain('Password non corrisponde!');

    currentAlert = htmlTest(passCheckInput, 'Pa$5word', '#passCheckAlert')    //ok value
    expect(currentAlert).toBeNull();
    console.log("***** passCheck -> [OK]");

  });
});
