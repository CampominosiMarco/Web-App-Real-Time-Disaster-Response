import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule } from '@angular/forms'; //Serve per il Two-way binding dell'input form


//Fondamentale chiamare la classe dentro il componente
import { FormComponentComponent } from './form-component/form-component.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { IntroComponent } from './intro/intro.component';
import { CoursesComponent } from './courses/courses.component';
import { FooterComponent } from './components/footer/footer.component';
import { EInfoComponent } from './e-info/e-info.component';
import { MioTuboPipe } from './mio-tubo.pipe';
import { RegistrationComponent } from './components/registration/registration.component';
import { TermsConditionsComponent } from './components/terms-conditions/terms-conditions.component';
import{LogoCompleteComponent} from './components/logo-complete/logo-complete.component';
import { HomeComponent } from './home/home.component';
import { Logo512Component } from './components/logo-512/logo-512.component';


@NgModule({
  declarations: [
    AppComponent,

    FormComponentComponent,
     NavbarComponent,
     LoginComponent,  //Fondamentale indicare tutti i componenti da lanciare all'avvio
     IntroComponent,
     CoursesComponent,
     FooterComponent,
     EInfoComponent,
     MioTuboPipe,
     RegistrationComponent,
     TermsConditionsComponent,
     LogoCompleteComponent,
     HomeComponent,
     Logo512Component

    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule         //Serve per il binding

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
