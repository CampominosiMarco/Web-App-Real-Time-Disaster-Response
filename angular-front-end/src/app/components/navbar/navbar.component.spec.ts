import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavbarComponent } from './navbar.component';
import { Logo512Component } from '../logo-512/logo-512.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let debugElement: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        NavbarComponent,
        Logo512Component
      ]
    });
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  let check1 = '[NavbarComponent] component creation';
  it(check1, () => {
    expect(component).toBeTruthy();
    console.log(check1 + " -> [OK]");
  });

  let check2 = '[NavbarComponent] component Logo 512 creation';
  it(check2, () => {
    const imageElement = debugElement.query(By.css('app-logo-512'));
    expect(imageElement).toBeTruthy();
    console.log(check2 + " -> [OK]");
  });

  let check3 = '[NavbarComponent] navbar-brand href check';
  it(check3, () => {
    const brandElement = debugElement.query(By.css('.navbar-brand'));
    expect(brandElement.nativeElement.getAttribute('href')).toBe(component.brandUrl);
    console.log(check3 + " -> [OK]");
  });

});
