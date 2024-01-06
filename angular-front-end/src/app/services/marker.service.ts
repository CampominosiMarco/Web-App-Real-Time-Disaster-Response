import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class MarkerService {
  private saveUrl = 'http://localhost:8081/markers/add';      //TODO aggiornare url
  private markersUrl = 'http://localhost:8081/markers/all';   //TODO aggiornare url

  constructor(private http: HttpClient, private authService: AuthService) { }

  saveMarker(consent: boolean, description: string, icon: string, latLng: google.maps.LatLng): Observable<any> {
    const markerPosition = { lat: latLng.lat(), lng: latLng.lng() };
    
    const dataToSendJSON = {
      user_id: this.authService.getUserId(),
      consent: consent,
      description: description,
      icon: icon,
      position: JSON.stringify(markerPosition)
    };

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post(this.saveUrl, dataToSendJSON, { headers }).pipe(
      catchError((error) => {
        return throwError(() => new Error(error.error));
      })
    );
  }

  getAllMarkers(): Observable<any[]> {
    return this.http.get<any[]>(this.markersUrl);
  }
}
