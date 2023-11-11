import { Component } from '@angular/core';

@Component({
  selector: 'app-logo-complete',
  templateUrl: './logo-complete.component.html',
  styleUrls: ['./logo-complete.component.css']
})
export class LogoCompleteComponent {
  imageUrl: string = "/assets/CM-InnovationLab.it_logo_completo.png";
  altText: string = "CM-InnovationLab Logo Completo";

  onImageLoad(){
    
  }

}
