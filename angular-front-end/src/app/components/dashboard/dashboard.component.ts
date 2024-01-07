import { Component, OnInit, ViewChild } from '@angular/core';
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
  showMarkerForm: boolean = false;
  currentlatLng: google.maps.LatLng | undefined;

  constructor(private http: HttpClient,
              private authService: AuthService,
              private router: Router,
              private markerService: MarkerService) {
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
        this.currentlatLng = latLng;
        this.showMarkerForm = true;
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

  receiveFormData(formData: any) {
    //console.log('Form data:', formData);

    if (this.currentlatLng != null){
      this.markerService.saveMarker(formData.allowContactInfo, formData.description, formData.selectedIcon, this.currentlatLng)
        .subscribe((response: any) => {
          let title = `[NEW - ${response.marker_id}]\n${this.authService.getUserName()}\n-----------\n${formData.description}\n`;

          if (this.currentlatLng != null){
            this.addMarkerOnMap(formData.selectedIcon, title, this.currentlatLng);
          }
      });
    }
    this.showMarkerForm = false;
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