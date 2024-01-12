import { Component, Output, EventEmitter } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-marker-form',
  templateUrl: './marker-form.component.html',
  styleUrls: ['./marker-form.component.css']
})
export class MarkerFormComponent {
  
  @Output() formSubmit: EventEmitter<any> = new EventEmitter();

  selectedIcon: string = '';
  description: string = '';
  allowContactInfo: boolean = false;

  constructor(public authService: AuthService) {
    this.defaultIconSelection();
  }

  onSubmit() {
    const formData = {
      selectedIcon: this.selectedIcon,
      description: this.description,
      allowContactInfo: this.allowContactInfo
    };
    this.reset();
    this.formSubmit.emit(formData);
  }

  reset(){
    this.selectedIcon = '';
    this.description = '';
    this.allowContactInfo = false;
    this.defaultIconSelection();
  }

  defaultIconSelection(){
    const userId = this.authService.getUserId();
    if (userId === 1) {
      this.selectedIcon = 'B'
    } else if (userId === 2) {
      this.selectedIcon = 'O'
    } else if (userId === 3) {
      this.selectedIcon = 'Y'
    } else {
      this.selectedIcon = 'R'
    }
  }

  resetForm(){
    const formData = {
      reset: 'user_reset'
    };
    this.reset();
    this.formSubmit.emit(formData);
  }
}
