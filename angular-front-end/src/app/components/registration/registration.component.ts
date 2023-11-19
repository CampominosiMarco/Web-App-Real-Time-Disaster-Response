import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';
import { Validators } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],

  imports: [ReactiveFormsModule, CommonModule]
})


export class RegistrationComponent {

//https://angular.io/guide/form-validation#built-in-validator-functions

  regUserName = new FormControl(null, [
    Validators.required,
    Validators.minLength(8)]);
  regUserPrimaryEmail = new FormControl(null,[
    Validators.required,
    Validators.minLength(6),
    Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]);  //Preferisco pattern a 'mail' (https://angular.io/api/forms/Validators#email)
  regUserConfirmEmail = new FormControl(null,[
    Validators.required,
    Validators.minLength(6),
    Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]);
  regUserMobile = new FormControl(null, [
    Validators.required,
    Validators.pattern("^[0-9]\\d*$")]);
  regUserPrimaryPassword = new FormControl(null, Validators.required);
  regUserConfirmPassword = new FormControl(null, Validators.required);
  regUserAgree = new FormControl(false, Validators.requiredTrue);

  formAll = new FormGroup({
    name: this.regUserName, 

    mails: new FormGroup({
      mail1: this.regUserPrimaryEmail, 
      mail2: this.regUserConfirmEmail
    },{validators: matchMail} ),

    mobile: this.regUserMobile,

    pass: new FormGroup({
      pass1: this.regUserPrimaryPassword, 
      pass2: this.regUserConfirmPassword, 
    },{validators: matchPassword} ),

    agree: this.regUserAgree


    
  });





  onSubmit(){
    console.warn(this.formAll.value);
    console.warn(this.formAll.errors);

    console.log("User:", this.regUserName.errors);

    console.log("Primary Mail:", this.regUserPrimaryEmail.errors);
    console.log("Secondary Mail:", this.regUserConfirmEmail.errors);
    console.log("Match Mails:", this.formAll.controls.mails.errors);

    console.log("Mobile:", this.regUserMobile.errors);

    console.log("Primary Pass:", this.regUserPrimaryPassword.errors);
    console.log("Secondary Pass:", this.regUserConfirmPassword.errors);
    console.log("Match Passwords:", this.formAll.controls.pass.errors);

    console.log("Agree:", this.regUserAgree.errors);
  }








}

//https://angular.io/guide/form-validation#defining-custom-validators
//https://www.youtube.com/watch?v=QsTp_XB3D4M&ab_channel=Geek97

export const matchPassword: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  let password = control.get('pass1');
  let confirmPassword = control.get('pass2');
  
  if (password && confirmPassword && password?.value != confirmPassword?.value){
      return { matchPasswordError : true }
  }
  return null;
}

export const matchMail: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  let mail = control.get('mail1');
  let confirmMail = control.get('mail2');
  
  if (mail && confirmMail && mail?.value != confirmMail?.value){
      return { matchMailError : true }
  }
  return null;
}