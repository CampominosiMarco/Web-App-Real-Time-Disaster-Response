import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

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

  constructor() {
    this.initMap();
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
    this.addMarker(markerPosition, 'Piazza di Quarrata\nCampominosi');






  }




  addMarker(latLng: google.maps.LatLngLiteral, title: string): void {
    if (this.map) {
      new google.maps.Marker({
        position: latLng,
        map: this.map,
        title: title,
        icon: {
          url: 'assets/green_point.png',
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

}