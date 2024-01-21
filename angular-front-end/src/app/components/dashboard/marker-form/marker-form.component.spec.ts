import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MarkerFormComponent } from './marker-form.component';
import { FormsModule } from '@angular/forms';

describe('MarkerFormComponent', () => {
  let component: MarkerFormComponent;
  let fixture: ComponentFixture<MarkerFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MarkerFormComponent],
      imports: [ FormsModule ]
    });
    fixture = TestBed.createComponent(MarkerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  let check1 = '[MarkerFormComponent] component creation';
  it(check1, () => {
    expect(component).toBeTruthy();
    console.log(check1 + " -> [OK]");
  });

});
