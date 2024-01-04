import { Component, OnInit, ViewChild } from '@angular/core';
import { ToggleSearchComponent } from './toggle-search/toggle-search.component';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  //This is necessary to get methods and attributes from child
  @ViewChild(ToggleSearchComponent) toggleSearchComponent!: ToggleSearchComponent;

  map: google.maps.Map | null = null;

  center: google.maps.LatLngLiteral = {
    lat: 43.8475,
    lng: 10.9777
  };
  zoom = 13;

  display: google.maps.LatLngLiteral = {
    lat: this.center.lat,
    lng: this.center.lng
  };

  constructor(private authService: AuthService, private router: Router) {
    if (!this.authService.isLoggedIn()){
      this.router.navigate(['/login']);
    }else{
      this.initMap();
    }
  }

  async initMap(): Promise<void> {
    const { Map } = await google.maps.importLibrary("maps") as google.maps.MapsLibrary;
    this.map = new Map(document.getElementById("map") as HTMLElement, {
      center: this.center,
      zoom: this.zoom,
    });

    //Listener mouse
    this.map.addListener('mousemove', (event: google.maps.MapMouseEvent) => {
      const latLng = event.latLng; 

      if (latLng != null) {
        this.display = (latLng.toJSON());
      }
    });

    //Listener double click
    this.map.addListener('dblclick', (event: google.maps.MapMouseEvent) => {
      const latLng = event.latLng;

      if (latLng != null) {
        this.showMarkerPopup(latLng);
      }
    });

    if (this.map) {
      this.map.setMapTypeId(google.maps.MapTypeId.HYBRID);
    }







    const markerPosition = {
      lat: this.center.lat,
      lng: this.center.lng
    };
    this.addMarker(markerPosition, 'Piazza di Quarrata\n' +  + this.authService.getUserId() + '\n' + this.authService.getUserName() + '\n' + this.authService.isAdmin());






  }

/* TODO
all'avvio visualizzare tutto
impostare DB
*/
  addMarker(latLng: google.maps.LatLngLiteral, title: string): void {
    if (this.map) {
      new google.maps.Marker({
        position: latLng,
        map: this.map,
        title: title,
        icon: {
          url: 'assets/blue_point.png',
          scaledSize: new google.maps.Size(33, 50),
        },
        /*label: {
          text: 'A',
          color: 'white',
          fontWeight: 'bold',
        },*/
      });
    }
  }

  showMarkerPopup(latLng: google.maps.LatLng): void {
    const markerPosition = { lat: latLng.lat(), lng: latLng.lng() };




    // Qui puoi utilizzare qualsiasi libreria o meccanismo per mostrare un popup, ad esempio un modal o un componente Angular
    // In questo esempio, supponiamo un alert per semplicità
    const title = prompt('Inserisci il titolo del marker:');
    if (title) {
      this.addMarker(markerPosition, title);
    }
  }

  ngOnInit(): void {

  }




    
//This is methods called from child. See also EventEmitter in child and listener in HTML
  onToggleSearchEvent() {
    console.log('Evento ricevuto dal ToggleSearchComponent: ' + this.toggleSearchComponent.getDescription() + ' ' + this.toggleSearchComponent.getValue());
  }
}