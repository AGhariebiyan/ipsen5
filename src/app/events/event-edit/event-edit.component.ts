import { Component, OnInit } from '@angular/core';
import { RouterExtensions } from '@nativescript/angular';
import { ActivatedRoute } from "@angular/router";
import { EventResponse } from "~/app/shared/models/event-response.model";
import { DialogService } from "~/app/services/dialog.service";
import { EventService } from "~/app/services/event.service";

@Component({
  selector: 'ns-event-edit',
  templateUrl: './event-edit.component.html',
  styleUrls: ['./event-edit.component.css']
})
export class EventEditComponent implements OnInit {
  _event: EventResponse;

  constructor(private routerExtensions: RouterExtensions, private activeRoute: ActivatedRoute,
              private dialogService: DialogService, private eventService: EventService) { }

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

  openSave() {
    this.dialogService.showConfirm("Opslaan", "Weet u zeker dat u het evenement wilt aanpassen?")
        .then( result => {
          if(result) {
            this.save();
          }
        });
  }

  private save() {
    this.eventService.updateEvent(this._event)
        .then(() => {
          this.dialogService.showDialog("Opslaan", "Het evenement is succesvol opgeslagen.")
              .then(this.goBack);
        })
        .catch(() => {
          this.dialogService.showDialog("Let op!", "Er ging iets mis, probeer het later opnieuw " +
              "of neem contact op met de systeembeheerder.")
        });
  }
}
