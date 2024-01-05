import { Component, OnInit, ViewChild } from '@angular/core';
import { ToggleSearchComponent } from './toggle-search/toggle-search.component';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

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

  constructor(private http: HttpClient, private authService: AuthService, private router: Router) {
    if (!this.authService.isLoggedIn()){
      this.router.navigate(['/login']);
    }else{
      this.initMap();
    }
  }

  ngOnInit(): void {

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
    //    this.showMarkerPopup(latLng);




        this.saveMarker(true, 'PASTA\nACQUA\nIDROVORA', 'Y', latLng);

        this.addMarkerOnMap(true, 'PASTA\nACQUA\nIDROVORA', 'Y', latLng);
      }
    });

    if (this.map) {
      this.map.setMapTypeId(google.maps.MapTypeId.HYBRID);
    }





/*

    const markerPosition = {
      lat: this.center.lat,
      lng: this.center.lng
    };
    this.addMarkerOnMap(markerPosition, 'Piazza di Quarrata\n' +  + this.authService.getUserId() + '\n' + this.authService.getUserName() + '\n' + this.authService.isAdmin());

*/




  }

/* TODO
all'avvio visualizzare tutto
impostare DB
*/




  addMarkerOnMap(consent: boolean, description: string, icon: string, latLng: google.maps.LatLng): void {
    if (this.map) {


      let my_title = this.authService.getUserName() + 
                      consent +
                      "-----" +
                      description;
  




      new google.maps.Marker({
        position: this.latLngConvertion(latLng),
        map: this.map,
        title: my_title,
        icon: {
          url: this.iconLetterToLink(icon),
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

  

  saveMarker(consent: boolean, description: string, icon: string, latLng: google.maps.LatLng){

    const url = 'http://localhost:8081/markers/add';      //TODO aggiornare url

    
    const markerPosition = { lat: latLng.lat(), lng: latLng.lng() };

    const dataToSendJSON = {
      user_id: this.authService.getUserId(),
      consent: consent,
      description: description,
      icon: icon,
      position: JSON.stringify(markerPosition)
    }

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http.post(url, dataToSendJSON, { headers })
      .pipe(
        catchError((response) => {

/*
          if (response && response.message) {
           // this.logUserAlert = response.message;
          }
*/


          return throwError(() => new Error(response));
        })
      )
      .subscribe((response: any) => {
        console.log('Marker ADD COMPLETED:\n', response);


    });

  }









  showMarkerPopup(latLng: google.maps.LatLng): void {



    // Qui puoi utilizzare qualsiasi libreria o meccanismo per mostrare un popup, ad esempio un modal o un componente Angular
    // In questo esempio, supponiamo un alert per semplicità
    const title = prompt('Inserisci il titolo del marker:');
    if (title) {
      this.addMarkerOnMap(true, title, 'O', latLng);
    }
  }










  latLngConvertion(latLng: google.maps.LatLng): google.maps.LatLngLiteral{

    const latLngLiteral: google.maps.LatLngLiteral = {
      lat: latLng.lat(),
      lng: latLng.lng(),
    };

    return latLngLiteral;
  }

  iconLetterToLink(letter: string): string{
    let link: string;

    switch (letter.toUpperCase()) {
        case 'B':
            link = 'assets/blue_point.png';
            break;
        case 'R':
            link = 'assets/red_point.png';
            break;
        case 'G':
            link = 'assets/green_point.png';
            break;
        case 'O':
            link = 'assets/orange_point.png';
            break;
        case 'Y':
            link = 'assets/yellow_point.png';
            break;
        default:
            link = 'assets/blue_point.png';
            break;
    }

    return link;
  }
    
//This is methods called from child. See also EventEmitter in child and listener in HTML
  onToggleSearchEvent() {
    console.log('Evento ricevuto dal ToggleSearchComponent: ' + this.toggleSearchComponent.getDescription() + ' ' + this.toggleSearchComponent.getValue());
  }
}