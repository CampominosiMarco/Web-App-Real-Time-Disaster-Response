import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import {TermsConditionsComponent} from './components/terms-conditions/terms-conditions.component';


import { LoginComponent } from './login/login.component';
import { FooterComponent } from './components/footer/footer.component';
import { RegistrationComponent } from './components/registration/registration.component';

const routes: Routes = [

  {path: 'reg', component: RegistrationComponent},
  {path: 'conditions', component: TermsConditionsComponent},

  {path: 'login', component: LoginComponent},
  {path: 'foot', component: FooterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
