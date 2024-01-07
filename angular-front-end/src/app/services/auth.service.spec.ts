import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService);
  });

  let check1 = '[AuthService] service creation';
  it(check1, () => {
    expect(service).toBeTruthy();
    console.log(check1 + " -> [OK]");
  });

  let check2 = '[AuthService] service test';
  it(check2, async () => {
    expect(service.isLoggedIn()).toBe(false);
    service.login(77, 'UserName_Test');
    expect(service.isLoggedIn()).toBe(true);
    expect(service.getUserId()).toBe(77);
    expect(service.getUserName()).toBe('UserName_Test');
    expect(service.isAdmin()).toBe(false);
    service.logout();
    expect(service.isLoggedIn()).toBe(false);
    console.log(check2 + " -> [OK]");
  });

});
