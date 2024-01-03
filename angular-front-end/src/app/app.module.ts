import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms'; //Serve per il Two-way binding dell'input form

//Fondamentale chiamare la classe dentro il componente

import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { FooterComponent } from './components/footer/footer.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { TermsConditionsComponent } from './components/terms-conditions/terms-conditions.component';
import {LogoCompleteComponent} from './components/logo-complete/logo-complete.component';
import { HomeComponent } from './components/home/home.component';
import { Logo512Component } from './components/logo-512/logo-512.component';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { GoogleMapsModule } from '@angular/google-maps';

@NgModule({
  declarations: [
    NavbarComponent,
    AppComponent,
    LoginComponent,  //Fondamentale indicare tutti i componenti da lanciare all'avvio
    FooterComponent,
    TermsConditionsComponent,
    LogoCompleteComponent,
    HomeComponent,
    Logo512Component,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RegistrationComponent,        //Questo viene importato perchè è STANDALONE ed ha ReactiveFormsModule all'interno
    FormsModule,         //Serve per il binding
    GoogleMapsModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
