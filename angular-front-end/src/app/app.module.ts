import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule } from '@angular/forms'; //Serve per il Two-way binding dell'input form


//Fondamentale chiamare la classe dentro il componente
import { FormComponentComponent } from './form-component/form-component.component';



@NgModule({
  declarations: [
    AppComponent,

    FormComponentComponent  //Fondamentale indicare tutti i componenti da lanciare all'avvio
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
