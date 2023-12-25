import { Injectable } from '@angular/core';
import * as bcrypt from 'bcryptjs';   //npm install bcryptjs

@Injectable({
  providedIn: 'root'
})
export class HashPasswordService {

  constructor() { }

  async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  }

  async comparePassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
    const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
    return isMatch;
  }
}
