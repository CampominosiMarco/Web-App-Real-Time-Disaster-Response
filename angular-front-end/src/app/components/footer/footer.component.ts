import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  lastUpdateDate: string = '04/01/2023';
  copyrightDate: string = "2023";
}
