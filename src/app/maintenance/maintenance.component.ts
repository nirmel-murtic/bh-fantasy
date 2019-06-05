import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-maintenance',
  templateUrl: './maintenance.component.html',
  styleUrls: ['./maintenance.component.css']
})
export class MaintenanceComponent implements OnInit {

  public error: string;

  constructor() { }

  ngOnInit() {
    this.error = sessionStorage.error;
  }

}
