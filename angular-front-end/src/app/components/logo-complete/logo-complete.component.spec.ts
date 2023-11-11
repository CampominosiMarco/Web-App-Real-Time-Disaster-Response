import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { LogoCompleteComponent } from './logo-complete.component';
import { By } from '@angular/platform-browser';

describe('LogoCompleteComponent', () => {
  let component: LogoCompleteComponent;
  let fixture: ComponentFixture<LogoCompleteComponent>;
  let debugElement: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LogoCompleteComponent]
    });
    fixture = TestBed.createComponent(LogoCompleteComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  let check1 = '[LogoCompleteComponent] component creation';
  it(check1, () => {
    expect(component).toBeTruthy();
    console.log(check1 + " -> [OK]");
  });

  let check2 = '[LogoCompleteComponent] img src check';
  it(check2, () => {
    component.imageUrl = "xxx.png";
    fixture.detectChanges();
    const imageElement = debugElement.query(By.css('img'));
    expect(imageElement.nativeElement.getAttribute('src')).toBe("xxx.png");
    console.log(check2 + " -> [OK]");
  });

  let check3 = '[LogoCompleteComponent] img alt check';
  it(check3, () => {
    const imageElement = debugElement.query(By.css('img'));
    expect(imageElement.nativeElement.getAttribute('alt')).toBe(component.altText);
    console.log(check3 + " -> [OK]");
  });
  
});
