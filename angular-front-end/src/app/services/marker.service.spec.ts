




import { MarkerService } from './marker.service';

import { AuthService } from './auth.service';
import { HttpClientModule } from '@angular/common/http';



import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';



export class MockLatLng implements google.maps.LatLng {
  constructor(private lats: number, private lngs: number) {}
  toJSON(): google.maps.LatLngLiteral {
    throw new Error('Method not implemented.');
  }
  toUrlValue(precision?: number | undefined): string {
    throw new Error('Method not implemented.');
  }

  equals(other: google.maps.LatLng): boolean {
    return this.lats === other.lat() && this.lngs === other.lng();
  }

  lat(): number {
    return this.lats;
  }

  lng(): number {
    return this.lngs;
  }

  toString(): string {
    return `MockLatLng: (${this.lat}, ${this.lng})`;
  }
}





describe('MarkerService', () => {
  let service: MarkerService;
  let serviceAuth: AuthService;

 
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MarkerService,
        AuthService,
      ],
      imports: [ HttpClientModule ]
    });
    service = TestBed.inject(MarkerService);
    serviceAuth = TestBed.inject(AuthService);
  });




  let check1 = '[MarkerService] service creation';
  it(check1, () => {
    expect(service).toBeTruthy();
    console.log(check1 + " -> [OK]");
  });





  let check2 = '[MarkerService] service test';
  it(check2, async () => {



    serviceAuth.login(1, "Comune di Quarrata");
 //   const { Map } = await google.maps.importLibrary("maps") as google.maps.MapsLibrary;


    var my_latLng = new MockLatLng(1, 2);
    
    console.log(my_latLng);
    
    expect(service.getAllMarkers()).toBeTruthy();



    var new_id: number = -1;

    console.log(new_id);

    expect(service.saveMarker(true, 'Test Description', '', my_latLng).subscribe((response: any) => {
      new_id = response.marker_id;
    })).toBeTruthy();


    console.log(new_id);

    service.getMarkerByUser(1).subscribe((response: any) => {
      const markerWithId = response.find((marker: any) => marker.id === new_id);
      expect(markerWithId).toBeDefined();
      expect(markerWithId.getDescription()).toBe('Test Description');
    });

    console.log(new_id);
    service.updateMarkerDescription(new_id, 'NEW Test Description').subscribe((response: any) => {
      expect(response.updated_marker_id).toBe(new_id);
    });

    console.log(new_id);
    service.deleteMarkerById(new_id).subscribe((response: any) => {
      expect(response.deleted_marker_id).toBe(new_id);
    });
    console.log(new_id);
  });

});
  