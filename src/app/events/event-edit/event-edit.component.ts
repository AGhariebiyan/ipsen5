import { Component, OnInit } from '@angular/core';
import { RouterExtensions } from '@nativescript/angular';
import { ActivatedRoute } from "@angular/router";
import { DialogService } from "~/app/services/dialog.service";
import { EventService } from "~/app/services/event.service";
import { Event } from "~/app/models/event.model";

@Component({
  selector: 'ns-event-edit',
  templateUrl: './event-edit.component.html',
  styleUrls: ['./event-edit.component.css']
})
export class EventEditComponent implements OnInit {
  _event: Event;

  constructor(private routerExtensions: RouterExtensions, private activeRoute: ActivatedRoute,
              private dialogService: DialogService, private eventService: EventService) { }

  ngOnInit(): void {
    this.activeRoute.queryParams.subscribe(params => {
      this._event = JSON.parse(params["event"]);
      let dateArray = this._event.eventDate.toString().split('T');
        this._event.eventDate = new Date(dateArray[0]);
    });
  }

  get event(): Event {
    return this._event;
  }

    goBack() {
        this.routerExtensions.back();
    }

  openSave() {
      if(this.validateData()) {
          this.dialogService.showConfirm("Opslaan", "Weet u zeker dat u het evenement wilt aanpassen?")
              .then( result => {
                  if(result) {
                      this.save();
                  }
              });
      }

  }

    private validateData() {
      let today = new Date();
      today.setHours(0,0,0,0);
      if(this._event.eventDate >= today) {
          for(const key of Object.keys(this._event)) {
              const value = this._event[key];
              if(value == null || value.toString().trim() == "") {
                  this.dialogService.showDialog("Let op!", "Er mogen geen waardes leeg zijn!");
                  return false;
              }
          }
          return true;
      }
      this.dialogService.showDialog("Let op!", "Vul een geldige datum in.");
        return false;
    }

  private save() {
    this.eventService.updateEvent(this._event)
        .then(() => {
          this.dialogService.showDialog("Opslaan", "Het evenement is succesvol opgeslagen.")
              .then(() => {
                this.eventService.getEvents()
                this.goBack()
              });
        })
        .catch(() => {
          this.dialogService.showDialog("Let op!", "Er ging iets mis, probeer het later opnieuw " +
              "of neem contact op met de systeembeheerder.")
        });
  }
}
