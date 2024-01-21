import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserTableComponent } from './user-table.component';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';

describe('UserTableComponent', () => {
  let component: UserTableComponent;
  let fixture: ComponentFixture<UserTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserTableComponent],
      imports: [ HttpClientModule, NgxPaginationModule ]
    });
    fixture = TestBed.createComponent(UserTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  let check1 = '[UserTableComponent] component creation';
  it(check1, () => {
    expect(component).toBeTruthy();
    console.log(check1 + " -> [OK]");
  });

});