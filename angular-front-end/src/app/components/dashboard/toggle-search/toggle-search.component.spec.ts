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

  let check2 = '[ToggleSearchComponent] Switch T';
  it(check2, (done) => {
    component.setValue('T');
    fixture.detectChanges();
    fixture.whenStable().then(() => {
        let radioElement: HTMLInputElement = fixture.nativeElement.querySelector('#switch-T');
        expect(radioElement.checked).toBe(true);
        console.log(check2 + " -> [OK]");
        done();
    });
  });

  let check3 = '[ToggleSearchComponent] Switch R';
  it(check3, (done) => {
    component.setValue('R');
    fixture.detectChanges();
    fixture.whenStable().then(() => {
        let radioElement: HTMLInputElement = fixture.nativeElement.querySelector('#switch-R');
        expect(radioElement.checked).toBe(true);
        console.log(check3 + " -> [OK]");
        done();
    });
  });

  let check4 = '[ToggleSearchComponent] Switch O';
  it(check4, (done) => {
    component.setValue('G');
    fixture.detectChanges();
    fixture.whenStable().then(() => {
        let radioElement: HTMLInputElement = fixture.nativeElement.querySelector('#switch-O');
        expect(radioElement.checked).toBe(true);
        console.log(check4 + " -> [OK]");
        done();
    });
  });

  let check5 = '[ToggleSearchComponent] Description test empty';
  it(check5, () => {
    expect(component.getDescription()).toBe('');
    let inputElement: HTMLInputElement = fixture.nativeElement.querySelector('#inputDescription');
    expect(inputElement.value).toBe('');
    console.log(check5 + " -> [OK]");
  });

  let check6 = '[ToggleSearchComponent] Description test';
  it(check6, (done) => {
    component.setDescription('TestDescription');
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      let inputElement: HTMLInputElement = fixture.nativeElement.querySelector('#inputDescription');
      expect(inputElement.value).toBe('TestDescription');
      console.log(check6 + " -> [OK]");
      done();
    });
  });

  let check7 = '[ToggleSearchComponent] Reset - Switch test';
  it(check7, (done) => {
    component.reset();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.getDescription()).toBe('');
      expect(component.getValue()).toBe('T');

      let radioElement: HTMLInputElement = fixture.nativeElement.querySelector('#switch-T');
      expect(radioElement.checked).toBe(true);

      let inputElement: HTMLInputElement = fixture.nativeElement.querySelector('#inputDescription');
      expect(inputElement.value).toBe('');
      console.log(check7 + " -> [OK]");
      done();
    });
  });

});
