import { Component } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Validators } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],

  imports: [ReactiveFormsModule]
})


export class RegistrationComponent {








//https://angular.io/guide/form-validation#built-in-validator-functions







  regUserName = new FormControl('Marco007', [
    Validators.required,
    Validators.minLength(10)]);
  regUserPrimaryEmail = new FormControl('m1@gmail.com',[
    Validators.required,
    Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]);
  regUserSecondaryEmail = new FormControl('m2@gmail.com',[
    Validators.required,
    Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]);
  regUserMobile = new FormControl('3395678455', Validators.required);
  regUserPrimaryPassword = new FormControl('saòjfhlkjhOUWJNDN');
  regUserSecondaryPassword = new FormControl('saòjfhlkjhOUWJNDN');
  regUserAgree = new FormControl('false');

  formAll = new FormGroup({
    name: this.regUserPrimaryEmail, 

    mails: new FormGroup({
      mail1: this.regUserPrimaryEmail, 
      mail2: this.regUserSecondaryEmail
    }, Validators.required),

    mobile: this.regUserMobile,

    pass: new FormGroup({
      pass1: this.regUserPrimaryPassword, 
      pass2: this.regUserSecondaryPassword, 
    }, Validators.required),

    agree: this.regUserAgree


    /*
    primaryEmail: new FormControl('',[
      Validators.required,
      Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
    secondaryEmail: new FormControl('',[
      Validators.required,
      Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")])
    */
    
    
    });











  onSubmit(){
    console.warn(this.formAll.value);
  }





}