import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { ToggleSearchComponent } from './toggle-search/toggle-search.component';
import { UserTableComponent } from './user-table/user-table.component';
import { MarkerFormComponent } from './marker-form/marker-form.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardComponent, ToggleSearchComponent, UserTableComponent, MarkerFormComponent],
      imports: [ HttpClientModule, NgxPaginationModule, FormsModule ]
    });
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  let check1 = '[DashboardComponent] component creation';
  it(check1, () => {
    expect(component).toBeTruthy();
    console.log(check1 + " -> [OK]");
  });

});