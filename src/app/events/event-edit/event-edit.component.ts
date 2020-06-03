import { Component, OnInit } from '@angular/core';
import { RouterExtensions } from '@nativescript/angular';
import { Event } from "~/app/shared/models/event.model";
import { ActivatedRoute } from "@angular/router";
import { EventResponse } from "~/app/shared/models/event-response.model";

@Component({
  selector: 'ns-event-edit',
  templateUrl: './event-edit.component.html',
  styleUrls: ['./event-edit.component.css']
})
export class EventEditComponent implements OnInit {
  _event: EventResponse;

  constructor(private routerExtensions: RouterExtensions, private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activeRoute.queryParams.subscribe(params => {
      this._event = JSON.parse(params["event"]);
    });
  }

  get event(): EventResponse {
    return this._event;
  }

    goBack() {
        this.routerExtensions.back();
    }
}
