import { MarkerService } from './marker.service';

import { AuthService } from './auth.service';
import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

//This is the way to use google.maps.LatLng
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

  var my_latLng = new MockLatLng(1, 2);

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

    serviceAuth.login(1, "Comune di Quarrata");
  });

  let check1 = '[MarkerService] service creation';
  it(check1, () => {
    expect(service).toBeTruthy();
    console.log(check1 + " -> [OK]");
  });

  let check2 = '[MarkerService] service test: ALL markers not null';
  it(check2, (done) => {
    service.getAllMarkers().subscribe((response: any) => {
      expect(response[0].id).toEqual(jasmine.any(Number));
      expect(response[0].id).toBeGreaterThan(0);
      console.log(check2 + " -> [OK]");
      done();
    });
  });

  let check3 = '[MarkerService] service test: CREATE - READ BY USER - UPDATE - DELETE';
  it(check3, (all_done) => {
    const my_description = 'Test Description';
    
    service.saveMarker(true, my_description, '', my_latLng).subscribe((response: any) => {
      const new_id = response.marker_id;
      expect(new_id).toEqual(jasmine.any(Number));
      expect(new_id).toBeGreaterThan(0);

      console.log("CREATE -> [OK]");
      console.log(response);

      service.getMarkerByUser(serviceAuth.getUserId()).subscribe((response2: any) => {
        const markerWithUserId = response2.find((marker: any) => marker.id === new_id);
        expect(markerWithUserId.id).toEqual(jasmine.any(Number));
        expect(markerWithUserId.id).toBeGreaterThan(0);
        expect(markerWithUserId.description).toBe(my_description);

        console.log("READ BY USER -> [OK]");

        const my_new_description = 'NEW Test Description';

        service.updateMarkerDescription(new_id, my_new_description).subscribe((response3: any) => {
          expect(response3.updated_marker_id).toBe(new_id);

          console.log("UPDATE -> [OK]");
          console.log(response3);

          service.deleteMarkerById(new_id).subscribe((response4: any) => {
            expect(response4.deleted_marker_id).toBe(new_id);
            
            console.log("DELETE -> [OK]");
            
            all_done();
          });
        });
      });
    });
  });
});