import { Component, OnInit } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular';
import { Event } from "~/app/shared/models/event.model";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'ns-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.css']
})
export class EventDetailComponent implements OnInit {
  items: ['Aanmeldingen', 'Gastenlijst', 'plaats'];
  event: Event;

  constructor(private routerExtensions: RouterExtensions, private activeRoute: ActivatedRoute) {
    this.activeRoute.queryParams.subscribe(params => (this.event = params["event"]));
  }

  ngOnInit(): void {
    console.log(this.event)
  }

  goBack() {
    this.routerExtensions.back();
  }

}
