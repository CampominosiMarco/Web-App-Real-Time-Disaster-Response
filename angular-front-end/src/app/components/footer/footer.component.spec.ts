import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FooterComponent } from './footer.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;
  let debugElement: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FooterComponent]
    });
    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  let check1 = '[FooterComponent] component creation';
  it(check1, () => {
    expect(component).toBeTruthy();
    console.log(check1 + " -> [OK]");
  });

  let check2 = '[FooterComponent] last update check';
  let ans2 = 'Last update: ';
  it(check2, () => {
    component.lastUpdateDate = '09/11/2023';
    fixture.detectChanges();
    const elementById = debugElement.query(By.css('#lastUpdateElement'));
    expect(elementById.nativeElement.textContent).toBe(ans2 + component.lastUpdateDate);
    console.log(check2 + " -> [OK] ('" + ans2 + component.lastUpdateDate + "')");
  });

  let check3 = '[FooterComponent] copyright check';
  let ans3 = '.:. Copyright ©2020-';
  it(check3, () => {
    component.copyrightDate = '3024';
    fixture.detectChanges();
    const elementById2 = fixture.nativeElement.querySelector('#copyrightElement');
    expect(elementById2.textContent).toBe(ans3 + component.copyrightDate + ' .:. ');
    console.log(check3 + " -> [OK] ('" + ans3 + component.copyrightDate + " .:. ')");
  });

  let check4 = '[FooterComponent] link to CM-InnovationLab.it';
  it(check4, () => {
    const linkElement = debugElement.query(By.css('.cm-test-link'));
    expect(linkElement).toBeTruthy();
    expect(linkElement.nativeElement.getAttribute('href')).toBe('https://www.cm-innovationlab.it/');
    console.log(check4 + " -> [OK]");
  });
});