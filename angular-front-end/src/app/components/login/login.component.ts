import { Component } from '@angular/core';
//import { HashPasswordService } from 'src/app/hash-password.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  logUser: string = '';
  logPassword: string = '';
  logUserAlert: string = '';

  constructor(private http: HttpClient) {}

  resetAttribute(){
    this.logUserAlert = '';
  }

  onSubmit(){
    if (this.logUser && this.logPassword) {

      console.log("Sending data...");

      const url = 'http://localhost:8081/login';      //TODO aggiornare url

      const dataToSendJSON = {
        name: this.logUser,
        password: this.logPassword
      };

      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

      this.http.post(url, dataToSendJSON, { headers })
        .pipe(
          catchError((response) => {

            this.logUserAlert = response;
            if (response && response.message) {
              this.logUserAlert = response.message;
            }
            if (response && response.error && response.error.error) {
              this.logUserAlert = response.error.error;
            }

            return throwError(() => new Error(this.logUserAlert));
          })
        )
        .subscribe((response) => {
          console.log('Login COMPLETED:\n', response);
      });

    } else {
      this.logUserAlert = 'Inserisci username e password.';
    }
  }
}