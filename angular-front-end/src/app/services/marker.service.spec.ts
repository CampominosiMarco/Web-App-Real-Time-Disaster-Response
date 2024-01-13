import { TestBed } from '@angular/core/testing';

import { MarkerService } from './marker.service';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';


describe('MarkerService', () => {
  let service: MarkerService;
  let serviceAuth: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MarkerService,
        AuthService,
      ],
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
   /* expect(service.isLoggedIn()).toBe(Observable<any>);
    service.login(77, 'UserName_Test');
    expect(service.isLoggedIn()).toBe(true);
    expect(service.getUserId()).toBe(77);
    expect(service.getUserName()).toBe('UserName_Test');
    expect(service.isAdmin()).toBe(false);
    service.logout();
    expect(service.isLoggedIn()).toBe(false);
    console.log(check2 + " -> [OK]");

*/
    serviceAuth.login(1, "Comune di Quarrata");
    my_latLng: google.maps.LatLngLiteral = {
      lat: 43.8475,
      lng: 10.9777
    };
    service.saveMarker(true, 'Test Desription', '', my_latLng);




    
      getAllMarkers(): Observable<any[]> {
        return this.http.get<any[]>(this.markersUrl);
      }
    
      getMarkerByUser(userId: number): Observable<any> {
        const complete_url = `${this.userUrl}${userId}`;
        return this.http.get<any[]>(complete_url);
      }
      
      deleteMarkerById(id: number): Observable<any> {
        const complete_url = `${this.baseUrl}${id}`;
        return this.http.delete<any>(complete_url);
      }
  });
});
