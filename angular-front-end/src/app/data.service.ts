import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  addInfo(info: any) {
    this.info1.push(info)
    this.info2.push(info)
    this.info3.push(info)
    return this.info1
  }


  info1: string[]=['Marco Campominosi', '123', 'mc@gmak.it']
  info2: string[]=['Marco 2 Campominosi', '456', 'mc2@gmak.it']
  info3: string[]=['Marco 3 Campominosi', '789', 'mc3@gmak.it']

  constructor() { }


  getInfo1():string[]{
    return this.info1
  }


  getInfo2():string[]{
    return this.info2
  }

  getInfo3():string[]{
    return this.info3
  }
}
