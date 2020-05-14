import { Component, OnInit } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular';

@Component({
  selector: 'ns-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.css']
})
export class EventDetailComponent implements OnInit {
  items: ['Aanmeldingen', 'Gastenlijst', 'plaats'];

  constructor(private routerExtensions: RouterExtensions) { }

  ngOnInit(): void {
  }

}
