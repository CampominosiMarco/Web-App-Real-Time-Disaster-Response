import { Component } from '@angular/core';
//import { HashPasswordService } from 'src/app/hash-password.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  logUser: string = '';
  logPassword: string = '';
  logUserAlert: string = '';

  constructor(private http: HttpClient, private authService: AuthService, private router: Router) {}

  resetAttribute(){
    this.logUserAlert = '';
  }

  onSubmit(){
    if (this.logUser && this.logPassword) {

      const url = 'http://cm-innovationlab.it:5007/login';

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

            this.authService.logout();
            return throwError(() => new Error(this.logUserAlert));
          })
        )
        .subscribe((response: any) => {
    //      console.log('Login COMPLETED:\n', response);

          this.authService.login(response.user_id, response.user_name);
          this.router.navigate(['/dashboard']);
      });

    } else {
      this.logUserAlert = 'Inserisci username e password.';
      this.authService.logout();
    }
  }
}