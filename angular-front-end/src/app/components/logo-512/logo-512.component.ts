import { Component } from '@angular/core';

@Component({
  selector: 'app-logo-512',
  templateUrl: './logo-512.component.html',
  styleUrls: ['./logo-512.component.css']
})
export class Logo512Component {
  imageUrl: string = "/assets/CM-InnovationLab.it_logo_512.png";
  altText: string = "CM-InnovationLab Logo 512";

  onImageLoad(){
    
  }

}