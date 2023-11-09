import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoCompleteComponent } from './logo-complete.component';

describe('LogoCompleteComponent', () => {
  let component: LogoCompleteComponent;
  let fixture: ComponentFixture<LogoCompleteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LogoCompleteComponent]
    });
    fixture = TestBed.createComponent(LogoCompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
