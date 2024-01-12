import { Component, OnInit, ViewChild } from '@angular/core';
import { ToggleSearchComponent } from './toggle-search/toggle-search.component';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { MarkerService } from 'src/app/services/marker.service';
import { UserTableComponent } from './user-table/user-table.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  //This is necessary to get methods and attributes from child
  @ViewChild(ToggleSearchComponent) toggleSearchComponent!: ToggleSearchComponent;
  @ViewChild(UserTableComponent) userTableComponent!: UserTableComponent;

  map: google.maps.Map | null = null;
  real_markers: google.maps.Marker[] = [];

  center: google.maps.LatLngLiteral = {
    lat: 43.8475,
    lng: 10.9777
  };
  zoom = 13;

/*
  display: google.maps.LatLngLiteral = {
    lat: this.center.lat,
    lng: this.center.lng
  };
*/

  markers_from_db: any[] = [];
  showMarkerForm: boolean = false;
  currentlatLng: google.maps.LatLng | undefined;

  constructor(private authService: AuthService,
              private router: Router,
              private markerService: MarkerService) {
    if (!this.authService.isLoggedIn()){
      this.router.navigate(['/login']);
    }else{
      this.initMap();
      this.updateTable();
    }
  }

  ngOnInit(): void {

  }

  async initMap(): Promise<void> {
    const { Map } = await google.maps.importLibrary("maps") as google.maps.MapsLibrary;
    this.map = new Map(document.getElementById("map") as HTMLElement, {
      center: this.center,
      zoom: this.zoom,
      disableDoubleClickZoom: true
    });

  /*
    //Listener mouse
    this.map.addListener('mousemove', (event: google.maps.MapMouseEvent) => {
      const latLng = event.latLng; 

      if (latLng != null) {
        this.display = (latLng.toJSON());
      }
    });
  */

    //Listener double click
    this.map.addListener('dblclick', (event: google.maps.MapMouseEvent) => {
      const latLng = event.latLng;

      if (latLng != null && this.map) {

        window.scrollTo({ top: 0, behavior: 'smooth' });

        this.map.setCenter(latLng);

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
    this.removeAllMarkers();
    
    this.markerService.getAllMarkers()
      .subscribe((data: any[]) => {
        this.markers_from_db = data;
        //console.log('Markers da DB:', this.markers_from_db);

        this.markers_from_db.forEach((markerInfo: any) => {
          this.addMarkerOnMap(markerInfo);
        });
      });
  }

  addMarkerOnMap(markerInfo: any): void {
    if (this.map) {
      let temp_marker = new google.maps.Marker({
        position: markerInfo.position,
        map: this.map,
        title: `[ID_${markerInfo.id}] - ${markerInfo.userName}`,
        icon: {
          url: this.iconLetterToLink(markerInfo.icon),
          scaledSize: new google.maps.Size(33, 50),
        },
        /*label: {
          text: 'A',
          color: 'white',
          fontWeight: 'bold',
        },*/
      });

      let temp_content = `<div>
                            <b>ID_</b>${markerInfo.id}<br>
                            <h5>${markerInfo.userName}</h5>`
      if (markerInfo.userMobile && markerInfo.userEmail) {
        temp_content += ` <div>
                          <u>Contatti:</u><br>
                          <span style="font-size: 23px;">&#9993;</span> ${markerInfo.userEmail}<br>
                          <span style="font-size: 25px;">&#9990;</span> ${markerInfo.userMobile}<br>
                          </div><br>`
      }
      temp_content += `<u>Descrizione:</u><br>${markerInfo.description.replaceAll("\n", "<br>")}
                      </div>`

      temp_marker.addListener('click', () => {
          let infoWindow = new google.maps.InfoWindow({
              content: temp_content
          });
          infoWindow.open(this.map, temp_marker);
      });

      this.real_markers.push(temp_marker);
    }
  }

  receiveFormData(formData: any) {
    //console.log('Form data:', formData);

    if (formData.reset !== 'user_reset'){
      if (this.currentlatLng != null){
        this.markerService.saveMarker(formData.allowContactInfo, formData.description, formData.selectedIcon, this.currentlatLng)
          .subscribe((response: any) => {

            console.log("New marker ID: " + response.marker_id);

            if (this.currentlatLng != null){
              this.fetchMarkers();
            }
        });
      }
    }
    this.showMarkerForm = false;
  }

  refreshMap(){
    this.toggleSearchComponent.reset();

    this.fetchMarkers();
    this.updateTable();
  }

  removeAllMarkers() {
    for (let i = 0; i < this.real_markers.length; i++) {
      this.real_markers[i].setMap(null);
    }
    this.real_markers = [];
  }

  updateTable(){
    this.markerService.getMarkerByUser(this.authService.currentUserId)
        .subscribe((data: any[]) => {
          data.forEach((markerInfo: any) => {
            markerInfo.icon = this.iconLetterToLink(markerInfo.icon);
         //   markerInfo.description = markerInfo.description.replaceAll("\n", "<br>")
          });
          this.userTableComponent.setMarkerInfos(data);
        });
  }

  userTableAction(): void {
    console.log("entrato");
    this.refreshMap();
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

    this.removeAllMarkers();
    
    const markerLetter = this.toggleSearchComponent.getValue();
    const markerDescription = this.toggleSearchComponent.getDescription().toUpperCase();

    this.markers_from_db.forEach((markerInfo: any) => {

      let save = false;
      const id = 'ID_' + markerInfo.id;

      if (markerDescription != ''){

        if (markerInfo.userEmail && markerInfo.userMobile) {
          if (id.includes(markerDescription) || markerInfo.userName.toUpperCase().includes(markerDescription) ||
              markerInfo.userEmail.toUpperCase().includes(markerDescription) || markerInfo.userMobile.includes(markerDescription) ||
              markerInfo.description.toUpperCase().includes(markerDescription)){

            if(markerLetter == 'T' || markerInfo.icon == markerLetter){
              save = true;
            }
          }
        }else{
          if (id.includes(markerDescription) || markerInfo.userName.toUpperCase().includes(markerDescription) ||
              markerInfo.description.toUpperCase().includes(markerDescription)){

            if(markerLetter == 'T' || markerInfo.icon == markerLetter){
              save = true;
            }
          }
        }

      }else{
        if(markerLetter == 'T' || markerInfo.icon == markerLetter){
          save = true;
        }
      }

      if (save){
        this.addMarkerOnMap(markerInfo);
      }
    });
  }
}