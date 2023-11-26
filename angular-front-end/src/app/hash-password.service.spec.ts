import { TestBed } from '@angular/core/testing';
import { HashPasswordService } from './hash-password.service';

describe('HashPasswordService', () => {
  let service: HashPasswordService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HashPasswordService);
  });

  let check1 = '[HashPasswordService] service creation';
  it(check1, () => {
    expect(service).toBeTruthy();
    console.log(check1 + " -> [OK]");
  });

  let check2 = '[HashPasswordService] service test';
  it(check2, async () => {
    const password = 'samePassword';
    const hashedPassword = await service.hashPassword(password);
    const isMatch = await service.comparePassword(password, hashedPassword);
    expect(isMatch).toBe(true);
    console.log(check2 + " -> [OK]");
  });

});


