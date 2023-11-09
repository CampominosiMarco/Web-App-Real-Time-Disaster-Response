import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Logo512Component } from './logo-512.component';

describe('Logo512Component', () => {
  let component: Logo512Component;
  let fixture: ComponentFixture<Logo512Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Logo512Component]
    });
    fixture = TestBed.createComponent(Logo512Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
