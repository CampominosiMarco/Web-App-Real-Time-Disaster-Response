import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  brandUrl: string = "https://www.cm-innovationlab.it/";

  constructor(){}
  
  ngOnInit(): void {
    //console.log('Method not implemented.')
  }
  
}
