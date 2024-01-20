import { Component, EventEmitter, Output } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { MarkerService } from 'src/app/services/marker.service';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.css']
})
export class UserTableComponent {

  @Output() notifyDashboardUserTable: EventEmitter<any> = new EventEmitter<any>();
  
  markerInfos: any[] = [];
  pagedMarkerInfos: any[] = [];
  pageSize: number = 10;
  currentPage: number = 1;
  currentUser: string = '';

  constructor(private markerService: MarkerService, public authService: AuthService){
    this.currentUser = this.authService.currentUserName;
  }

  pageChanged(event: any): void {
    this.currentPage = event;
    this.pagedMarkerInfos = this.markerInfos.slice((event - 1) * this.pageSize, event * this.pageSize);
  }

  setMarkerInfos(data: any){
    this.markerInfos = data;
  }

  setCurrentPage(num: number){
    this.currentPage = num;
  }

  onDeleteClick(id: number): void {
    this.markerService.deleteMarkerById(id).subscribe((response: any) => {
  //    console.log("DELETED marker ID: " + response.deleted_marker_id);
      this.notifyDashboardUserTable.emit();
    });
  }

  onEditClick(id: number, old_description: string): void {


    const newDescription = window.prompt('Inserisci la nuova descrizione:', old_description);

    if (newDescription !== null) {  
      this.markerService.updateMarkerDescription(id, newDescription).subscribe((response: any) => {
        // console.log("EDITED marker ID: " + response.updated_marker_id);
        this.notifyDashboardUserTable.emit();
      });
    }

    

  }
}
 