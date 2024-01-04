import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  currentUserName: any = null;
  currentUserId: any = null;

  constructor() {
    this.logout();
  }

  login(userId: number, username: string) {
    this.currentUserName = username;
    this.currentUserId = userId;
  }

  logout() {
    this.currentUserName = null;
    this.currentUserId = null;
  }

  isLoggedIn(): boolean {
    return this.currentUserId != null;
  }

  isAdmin(): boolean {
    return this.currentUserId == 1 || this.currentUserId == 2;
  }

  getUserName(): string {
    return this.currentUserName;
  }

  getUserId(): number {
    return this.currentUserId;
  }
}
