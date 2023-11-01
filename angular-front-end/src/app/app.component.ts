import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {
  title = 'TEST Titolo';

  creator_name = 'Marco Campominosi';
  image_campo = '/assets/CM-InnovationLab.it_logo_completo.png';



  onClickMarco(){
    console.log("CIAONE!")
  }

  value_Marco = "";

}
