import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-toggle-search',
  templateUrl: './toggle-search.component.html',
  styleUrls: ['./toggle-search.component.css']
})
export class ToggleSearchComponent {

  @Output() notifyDashboard: EventEmitter<any> = new EventEmitter<any>();

  switchValue: string = 'T';
  description: string = '';

  switchMode(value: string) {
    this.setValue(value);
    this.switchSearch();
  }

  switchSearch() {
    this.notifyDashboard.emit();
  }

  getDescription(){
    return this.description;
  }

  setDescription(value: string){
    this.description = value;
  }

  getValue(){
    return this.switchValue;
  }

  setValue(value: string) {
    this.switchValue = value;
  }

  reset(){
    this.switchValue = 'T';
    this.description = '';
  }

}

