import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarkerFormComponent } from './marker-form.component';

describe('MarkerFormComponent', () => {
  let component: MarkerFormComponent;
  let fixture: ComponentFixture<MarkerFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MarkerFormComponent]
    });
    fixture = TestBed.createComponent(MarkerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
