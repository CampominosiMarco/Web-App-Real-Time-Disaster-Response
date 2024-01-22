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
  real_markers_on_map: google.maps.Marker[] = [];

  markers_from_db: any[] = [];
  showMarkerForm: boolean = false;
  currentlatLng: google.maps.LatLng | undefined;

  only_visible_markers_id: number[] = [];
  user_markers_for_table: any[] = [];

  center: google.maps.LatLngLiteral = {
    lat: 43.8475,
    lng: 10.9777
  };
  zoom = 12;

  constructor(private authService: AuthService,
              private router: Router,
              private markerService: MarkerService) {

//    if (!this.authService.isLoggedIn()){
      //this.router.navigate(['/login']);
//      this.router.navigate(['login'], { relativeTo: this.route });
//    }else{
      this.initMap();
//    }

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

    //Listener on Map view
    this.map.addListener('idle', (event: google.maps.MapMouseEvent) => {
      this.updateVisibleMarkers();
    });

    if (this.map) {
      this.map.setMapTypeId(google.maps.MapTypeId.HYBRID);
      this.fetchMarkers();
    }
  }

  //Method to get all markers and user markers
  fetchMarkers(): void {
    this.removeAllMarkers();
    
    this.markerService.getAllMarkers().subscribe((data: any[]) => {
        this.markers_from_db = data;

        this.markers_from_db.forEach((markerInfo: any) => {
          this.addMarkerOnMap(markerInfo);
        });

        //This is the way to get less information event from server
        this.markerService.getMarkerByUser(this.authService.currentUserId).subscribe((data_user: any[]) => {
          this.user_markers_for_table = data_user;

          this.user_markers_for_table.forEach((markerInfo: any) => {
            markerInfo.icon = this.iconLetterToLink(markerInfo.icon);
        //  markerInfo.description = markerInfo.description.replaceAll("\n", "<br>")
          });

          this.updateVisibleMarkers();
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

      this.real_markers_on_map.push(temp_marker);
    }
  }

  //This is the method to get informations from form
  receiveFormData(formData: any) {
    if (formData.reset !== 'user_reset'){
      if (this.currentlatLng != null){
        this.markerService.saveMarker(formData.allowContactInfo, formData.description, formData.selectedIcon, this.currentlatLng).subscribe((response: any) => {
            //console.log("New marker ID: " + response.marker_id);

            if (this.currentlatLng != null){
              this.refreshMap();
            }
        });
      }
    }
    this.showMarkerForm = false;
  }

  //To show all markers on map
  refreshMap(){
    this.toggleSearchComponent.reset();
    this.fetchMarkers();
  }

  //Removes all markers on map. After we can show only what we need
  removeAllMarkers() {
    for (let i = 0; i < this.real_markers_on_map.length; i++) {
      this.real_markers_on_map[i].setMap(null);
    }
    this.real_markers_on_map = [];
  }

  //Filter for user markers visible on map
  updateTable(){
    const filteredData = this.user_markers_for_table.filter((markerInfo: any) => {
      return this.only_visible_markers_id.includes(markerInfo.id);
    });

    this.userTableComponent.setCurrentPage(1);
    this.userTableComponent.setMarkerInfos(filteredData);
  }

  //This is a method called from child. See also EventEmitter in child and listener in HTML
  //This method is needed to get udpate and delete from table event (PUT and DELETE for server)
  userTableAction(): void {
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

  //This is a method called from child. See also EventEmitter in child and listener in HTML
  //It filters markers on map for a better user experience
  onToggleSearchEvent() {

    this.removeAllMarkers();
    
    const markerLetter = this.toggleSearchComponent.getValue();
    const markerDescription = this.toggleSearchComponent.getDescription().toUpperCase();

    this.markers_from_db.forEach((markerInfo: any) => {

      let show = false;
      const id = 'ID_' + markerInfo.id; //This is necessary because markerInfo.id daesn't include "ID_" 

      if (markerDescription != ''){

        //email and mobile are optional info
        if (markerInfo.userEmail && markerInfo.userMobile) {
          if (id.includes(markerDescription) ||
              markerInfo.userName.toUpperCase().includes(markerDescription) ||
              markerInfo.userEmail.toUpperCase().includes(markerDescription) ||
              markerInfo.userMobile.includes(markerDescription) ||
              markerInfo.description.toUpperCase().includes(markerDescription)){

                show = (markerLetter == 'T' || markerInfo.icon == markerLetter);
          }
        }else{
          if (id.includes(markerDescription) ||
              markerInfo.userName.toUpperCase().includes(markerDescription) ||
              markerInfo.description.toUpperCase().includes(markerDescription)){

                show = (markerLetter == 'T' || markerInfo.icon == markerLetter);
          }
        }

      }else{
        //This option filters only by icon
        show = (markerLetter == 'T' || markerInfo.icon == markerLetter);
      }

      if (show){
        this.addMarkerOnMap(markerInfo);
      }
    });

    this.updateVisibleMarkers();
  }

  //With this method we can get visible markers array id always updated
  //It extract ID from marker's title
  updateVisibleMarkers() {
    if (this.map){
      this.only_visible_markers_id = [];
      var bounds = this.map.getBounds();

      this.real_markers_on_map.forEach((marker) => {
        var pos = marker.getPosition();
  
        if (bounds && pos !== null && pos !== undefined && bounds.contains(pos)) {
          var temp_title = marker.getTitle();
          if (temp_title !== null && temp_title !== undefined){
            const match = temp_title.match(/\[ID_(\d+)\]/);

            if (match) {
              this.only_visible_markers_id.push(parseInt(match[1], 10));
            }
          }
        }
      });
      
      this.updateTable();
    }
  }

}