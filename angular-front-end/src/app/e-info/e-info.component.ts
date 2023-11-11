import { Component, OnInit } from '@angular/core';
import {DataService} from '../data.service'

@Component({
  selector: 'app-e-info',
  templateUrl: './e-info.component.html',
  styleUrls: ['./e-info.component.css'],

  providers: [DataService]
})
export class EInfoComponent implements OnInit {

  constructor(private dservice: DataService){

  }

//Per lo switch
  public day=new Date().getDay();



//Per il pipe
  dateToday: string = new Date().toDateString();;
  name: string= "Marchino";



  ngOnInit(): void {

  //  throw new Error('Method not implemented.');
  }

  infoReceived: string []=[];
  infoReceived2: string []=[];
  infoReceived3: string []=[];


  getInfoFromService1(){
    this.infoReceived = this.dservice.getInfo1();
  }
  getInfoFromService2(){
    this.infoReceived2 = this.dservice.getInfo2();
  }
  getInfoFromService3(){
    this.infoReceived3 = this.dservice.getInfo3();
  }
  updateInfo(frm: any){
    this.dservice.addInfo(frm.value.location)
  }

}
