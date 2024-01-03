import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-toggle-search',
  templateUrl: './toggle-search.component.html',
  styleUrls: ['./toggle-search.component.css']
})
export class ToggleSearchComponent {

  @Output() notifyDashboard: EventEmitter<any> = new EventEmitter<any>();

  toggleValue: boolean = true;
  description: string = '';

  toggleMode() {
    this.toggleValue = !this.toggleValue;
  }

  toggleSearch() {
    this.notifyDashboard.emit();
  }

  getDescription(){
    return this.description;
  }

  getValue(){
    return this.toggleValue;
  }

}

