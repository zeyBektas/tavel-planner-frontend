import { Component, inject, OnInit } from '@angular/core';
import { RouteFacadeService } from '../../../façade/route-facade.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ModalComponent } from '../../Layouts/modal/modal.component';
import { CommonModule, JsonPipe } from '@angular/common';

@Component({
  selector: 'app-all-trips',
  standalone: true,
  imports: [CommonModule, JsonPipe, MatDialogModule],
  templateUrl: './all-trips.component.html',
  styleUrl: './all-trips.component.scss'
})
export class AllTripsComponent implements OnInit {

  routeFacadeService = inject(RouteFacadeService);
  dialog = inject(MatDialog);

  constructor() {}

  ngOnInit(): void {
    this.getRoutes();
  }

  getRoutes() {
    this.routeFacadeService.getAllRoutes(localStorage.getItem('userId') || '');
    console.log('my routesssssss');
  }

  openPopup(tripId: string) {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '250px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.routeFacadeService.cancelRoute(tripId).subscribe({
          next: (response: any) => {
            console.log('Cancel route response', response);
            this.getRoutes();
          },
          error: (error) => {
            console.log('Cancel route error', error);
            this.getRoutes();
          }
        });
      }
    });
  }
}
