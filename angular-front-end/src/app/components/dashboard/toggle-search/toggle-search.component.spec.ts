import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToggleSearchComponent } from './toggle-search.component';
import { FormsModule } from '@angular/forms';


describe('ToggleSearchComponent', () => {

  
  let component: ToggleSearchComponent;
  let fixture: ComponentFixture<ToggleSearchComponent>;


  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ToggleSearchComponent],
      imports: [FormsModule],
    });
    fixture = TestBed.createComponent(ToggleSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  let check1 = '[ToggleSearchComponent] component creation';
  it(check1, () => {
    expect(component).toBeTruthy();
    console.log(check1 + " -> [OK]");
  });
    /*
  let check2 = '[ToggleSearchComponent] Switch and Description test';
  it(check2, () => {

    component.switchValue = 'T';
    fixture.detectChanges();
    let radioElement: HTMLInputElement = fixture.nativeElement.querySelector('#switch-T');
    expect(radioElement.checked).toBe(true);

    component.switchValue = 'R';
    fixture.detectChanges();
    radioElement = fixture.nativeElement.querySelector('#switch-R');
    expect(radioElement.checked).toBe(true);
 
    component.switchValue = 'G';
    fixture.detectChanges();
    radioElement = fixture.nativeElement.querySelector('#switch-O');
    expect(radioElement.checked).toBe(true);



    expect(component.getDescription()).toBe('');
    let inputElement: HTMLInputElement = fixture.nativeElement.querySelector('#inputDescription');
    expect(inputElement.value).toBe('');



    component.setDescription('TestDescription');
    fixture.detectChanges();
    expect(inputElement.value).toBe('TestDescription');

    component.reset();
    expect(component.getDescription()).toBe('');
    expect(component.getValue()).toBe('T');
    radioElement = fixture.nativeElement.querySelector('#switch-T');
    expect(radioElement.checked).toBe(true);






















    console.log(check2 + " -> [OK]");
  });
*/
});
