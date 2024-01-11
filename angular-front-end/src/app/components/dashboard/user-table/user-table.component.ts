import { Component } from '@angular/core';
import { MarkerService } from 'src/app/services/marker.service';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.css']
})
export class UserTableComponent {
  markerInfos: any[] = [];
  pagedMarkerInfos: any[] = [];
  pageSize: number = 10;
  currentPage: number = 1;

  constructor(private markerService: MarkerService){
    
  }


  pageChanged(event: any): void {
    this.currentPage = event;
    this.pagedMarkerInfos = this.markerInfos.slice((event - 1) * this.pageSize, event * this.pageSize);
  }

  setMarkerInfos(data: any){
    this.markerInfos = data;
  }

  onDeleteClick(id: number): void {
    this.markerService.deleteMarkerById(id).subscribe((response: any) => {
      console.log("DELETED marker ID: " + response.deleted_marker_id);
    });
  }

  onEditClick(id: number): void {

    console.log("EDIT marker ID: " + id);

  }
}
 