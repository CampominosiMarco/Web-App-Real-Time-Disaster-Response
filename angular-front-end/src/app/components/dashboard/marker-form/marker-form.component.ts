import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-marker-form',
  templateUrl: './marker-form.component.html',
  styleUrls: ['./marker-form.component.css']
})
export class MarkerFormComponent {
  @Output() formSubmit: EventEmitter<any> = new EventEmitter();

  selectedIcon: string = 'R';
  description: string = '';
  allowContactInfo: boolean = false;

  onSubmit() {
    const formData = {
      selectedIcon: this.selectedIcon,
      description: this.description,
      allowContactInfo: this.allowContactInfo
    };
    this.formSubmit.emit(formData);
  }
}
