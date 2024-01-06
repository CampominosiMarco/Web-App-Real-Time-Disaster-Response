import { Component, ComponentFactoryResolver, ComponentRef, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ToggleSearchComponent } from './toggle-search/toggle-search.component';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MarkerService } from 'src/app/services/marker.service';
import { MarkerFormComponent } from './marker-form/marker-form.component';

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

  markers: any[] = [];

  constructor(private http: HttpClient,
              private authService: AuthService,
              private router: Router,
              private markerService: MarkerService,
              private componentFactoryResolver: ComponentFactoryResolver) {
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
 //       this.showMarkerPopup(latLng);
      }
    });

    if (this.map) {
      this.map.setMapTypeId(google.maps.MapTypeId.HYBRID);
      this.fetchMarkers();
    }
  }

  fetchMarkers(): void {
    this.markerService.getAllMarkers()
      .subscribe((data: any[]) => {
        this.markers = data;
      //  console.log('Markers:', this.markers);

        this.markers.forEach((markerInfo: any) => {

          let title = `[${markerInfo.id}]\n${markerInfo.userName}\n`;
          if (markerInfo.userMobile && markerInfo.userEmail) {
            title += `${markerInfo.userMobile}\n${markerInfo.userEmail}\n`;
          }
          title += `-----------\n${markerInfo.description}\n`;
    
          this.addMarkerOnMap(markerInfo.icon, title, markerInfo.position);
        });
      });
  }

  addMarkerOnMap(icon: string, title: string, latLng: google.maps.LatLng): void {
    if (this.map) {
      new google.maps.Marker({
        position: latLng,
        map: this.map,
        title: title,
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








  // Funzione che riceve i dati dal componente figlio
  receiveFormData(formData: any) {
    // Puoi fare qualcosa con i dati ricevuti dal form, ad esempio stamparli in console
    console.log('Dati ricevuti dal form:', formData);




//{selectedIcon: 'R', description: '', allowContactInfo: false}





    // O eseguire altre azioni necessarie con questi dati nel componente genitore
    // ...
  }

/*
  showMarkerPopup(latLng: google.maps.LatLng): void {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(MarkerFormComponent);
    this.markerComponentRef = this.markerContainer.createComponent(componentFactory);

    this.markerComponentRef.instance.latLng = latLng;
    this.markerComponentRef.instance.onSubmit.subscribe(() => {
      // Funzione per gestire il salvataggio del marker con i dati raccolti dal form
      // Puoi accedere ai dati tramite this.markerComponentRef.instance.latLng
    });
  }
*/








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