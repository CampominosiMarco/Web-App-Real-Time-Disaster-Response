import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { Logo512Component } from './logo-512.component';
import { By } from '@angular/platform-browser';

describe('Logo512Component', () => {
  let component: Logo512Component;
  let fixture: ComponentFixture<Logo512Component>;
  let debugElement: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Logo512Component]
    });
    fixture = TestBed.createComponent(Logo512Component);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  let check1 = '[Logo512Component] component creation';
  it(check1, () => {
    expect(component).toBeTruthy();
    console.log(check1 + " -> [OK]");
  });

  let check2 = '[Logo512Component] img src check';
  it(check2, () => {
    component.imageUrl = "xxx.png";
    fixture.detectChanges();
    const imageElement = debugElement.query(By.css('img'));
    expect(imageElement.nativeElement.getAttribute('src')).toBe("xxx.png");
    console.log(check2 + " -> [OK]");
  });

  let check3 = '[Logo512Component] img alt check';
  it(check3, () => {
    const imageElement = debugElement.query(By.css('img'));
    expect(imageElement.nativeElement.getAttribute('alt')).toBe(component.altText);
    console.log(check3 + " -> [OK]");
  });

});