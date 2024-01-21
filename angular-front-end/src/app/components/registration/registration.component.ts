import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';
import { Validators } from '@angular/forms';
import { HashPasswordService } from 'src/app/services/hash-password.service';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

import { Router } from '@angular/router';


@Component({
  standalone: true,
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],

  imports: [ReactiveFormsModule, CommonModule]
})

export class RegistrationComponent {

  constructor(private http: HttpClient,
              private router: Router,
              private hashPasswordService: HashPasswordService) {}

  regUserAlert = '';

//https://angular.io/guide/form-validation#built-in-validator-functions

  regUserName = new FormControl(null, [
    Validators.required,
    Validators.minLength(8)]);
  regUserPrimaryEmail = new FormControl(null,[
    Validators.required,
    Validators.minLength(6),
    Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]);  //Better then pattern 'mail' (https://angular.io/api/forms/Validators#email)
  regUserConfirmEmail = new FormControl(null,[
    Validators.required,
    Validators.minLength(6),
    Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]);
  regUserMobile = new FormControl(null, [
    Validators.required,
    Validators.pattern("^[0-9]\\d*$")]);
  regUserPrimaryPassword = new FormControl(null, [
    Validators.required,
    Validators.minLength(8)]);
  regUserConfirmPassword = new FormControl(null, [
    Validators.required,
    Validators.minLength(8)]);
  regUserAgree = new FormControl(false, Validators.requiredTrue);


  formAll = new FormGroup({
    name: this.regUserName, 

    mails: new FormGroup({
      mail1: this.regUserPrimaryEmail, 
      mail2: this.regUserConfirmEmail
    }, {validators: matchMail} ),

    mobile: this.regUserMobile,

    pass: new FormGroup({
      pass1: this.regUserPrimaryPassword, 
      pass2: this.regUserConfirmPassword, 
    }, {validators: matchPassword} ),

    agree: this.regUserAgree
  });

  resetAttribute(){
    this.regUserAlert = '';
  }

  async onSubmit(){
    if (this.formAll.errors != null){
      console.warn("Errors:", this.formAll.errors);
    }else{
//    console.log(this.formAll.value);
      console.log("Sending data validated...");

      const formDataJSON = {
        name: this.formAll.get('name')?.value,
        primaryEmail: this.formAll.get('mails.mail1')?.value,
        mobile: this.formAll.get('mobile')?.value,
        primaryPassword: await this.hashPasswordService.hashPassword(this.formAll.get('pass.pass1')?.value + '')
      };
      
      const url = 'http://cm-innovationlab.it:5007/registration';   //TODO: update url backend side
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

      this.http.post(url, formDataJSON, { headers })
        .pipe(
          catchError((response) => {
            this.regUserAlert = response;
            if (response && response.message) {
              this.regUserAlert = response.message;
            }
            if (response && response.error && response.error.error) {
              this.regUserAlert = response.error.error.split(" for key ")[0];
            }
            return throwError(() => new Error(this.regUserAlert));
          })
        )
        .subscribe((response) => {
          console.log('Registration COMPLETED:\n', response);
          this.router.navigate(['/login']);
      });
    }

//Errors report
    if (this.regUserName.errors != null){
      console.warn("User:", this.regUserName.errors);
    }

    if (this.regUserPrimaryEmail.errors != null || this.regUserConfirmEmail.errors != null || this.formAll.controls.mails.errors != null){
      console.warn("Primary Mail:", this.regUserPrimaryEmail.errors);
      console.warn("Secondary Mail:", this.regUserConfirmEmail.errors);
      console.warn("Match Mails:", this.formAll.controls.mails.errors);
    }

    if (this.regUserMobile.errors != null){
      console.warn("Mobile:", this.regUserMobile.errors);
    }

    if (this.regUserPrimaryPassword.errors != null || this.regUserConfirmPassword.errors != null || this.formAll.controls.pass.errors != null){
      console.warn("Primary Pass:", this.regUserPrimaryPassword.errors);
      console.warn("Secondary Pass:", this.regUserConfirmPassword.errors);
      console.warn("Match Passwords:", this.formAll.controls.pass.errors);
    }

    if (this.regUserAgree.errors != null){
      console.warn("Agree:", this.regUserAgree.errors);
    }
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