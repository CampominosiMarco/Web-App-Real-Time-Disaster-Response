import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class MarkerService {
  private baseUrl = 'http://localhost:8081/markers/';
  private saveUrl = this.baseUrl + 'add';
  private markersUrl = this.baseUrl + 'all';
  private userUrl = this.baseUrl + 'user/';

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

  getMarkerByUser(userId: number): Observable<any> {
    const complete_url = `${this.userUrl}${userId}`;
    return this.http.get<any[]>(complete_url);
  }
  
  deleteMarkerById(id: number): Observable<any> {
    const complete_url = `${this.baseUrl}${id}`;
    return this.http.delete<any>(complete_url);
  }

  updateMarkerDescription(id: number, newDescription: string): Observable<any> {
    const complete_url = `${this.baseUrl}${id}`;
    return this.http.put<any>(complete_url, newDescription);
  }
  
}