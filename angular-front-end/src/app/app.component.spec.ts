import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { Logo512Component } from './components/logo-512/logo-512.component';
import { LogoCompleteComponent } from './components/logo-complete/logo-complete.component';


describe('AppComponent', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [RouterTestingModule],
    declarations: [AppComponent, NavbarComponent, FooterComponent, Logo512Component, LogoCompleteComponent]
  }));

  let check1 = '[AppComponent] App creation';
  it(check1, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
    console.log(check1 + " -> [OK]");
  });
});
