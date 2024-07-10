import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-all-trips',
  standalone: true,
  imports: [],
  templateUrl: './all-trips.component.html',
  styleUrl: './all-trips.component.scss'
})
export class AllTripsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    
  }

  openPopup() {
    alert("Popup");
  }
}

