import { Component, OnInit } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular';
import { Event } from "~/app/shared/models/event.model";
import { ActivatedRoute } from "@angular/router";
import * as dialogs from "tns-core-modules/ui/dialogs";
import { ParticipantService } from "~/app/services/participant.service";
import { Participant } from "~/app/shared/models/participant";
import { EventResponse } from "~/app/shared/models/event-response.model";

@Component({
  selector: 'ns-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.css']
})

/**
 * @author Valerie Timmerman
 *
 * This class is responsible for showing and interacting with a single event.
 * The event that is opened gets passed on by the events overview page.
 */

export class EventDetailComponent implements OnInit {
  event: EventResponse;
  options = [];
  location: string;

  constructor(private routerExtensions: RouterExtensions, private activeRoute: ActivatedRoute,
              private service: ParticipantService) {
  }

  /**
   * @author Valerie Timmerman
   *
   * When the class is created the JSON object passed by the overview page gets parsed and put as a global variable.
   */
  ngOnInit(): void {
    this.activeRoute.queryParams.subscribe(params => {this.event = JSON.parse(params["event"])});
    let button1 = new InformationButton("Aanmeldingen", "32/50");
    let button2 = new InformationButton("Gastenlijst", ">");
    let button3 = new InformationButton("Plaats", "i");
    this.options.push(button1, button2, button3);

    this.location = this.event.eventLocationStreet + "\n" + this.event.eventLocationPostalCode + "\n" +
        this.event.eventLocationName + "\n" + this.event.eventLocationRegion + "\n" +
        this.event.eventLocationCountry;
  }

  goBack() {
    this.routerExtensions.back();
  }

  openActions() {
    dialogs.action({
      title: "Opties",
      cancelButtonText: "Annuleer",
      actions: ["Aanpassen", "Delen"]
    }).then(result => {
      console.log("Dialog result: " + result);
    });
  }

  openRegister() {
    dialogs.confirm({
      title: "Inschrijven",
      message: "Weet u zeker dat u zich wilt inschrijven voor dit evenement?",
      okButtonText: "Ja",
      cancelButtonText: "Nee"
    }).then(result => {
      if(result) {
        this.registerForEvent();
      }
    });
  }

  showConfirmation(result: boolean) {
    if(result) {
      dialogs.alert( {
        title: "Inschrijven",
        message: "U bent nu ingeschreven.",
        okButtonText: "Sluit"
      });
    }
  }

  private registerForEvent() {
    let participant = new Participant(this.event.id, "f5874b4d-8430-449e-9d20-41775385a892");
    this.service.registerParticipant(participant);
  }

  openInformation(event) {
    switch (event.firstArgument) {
      case "Aanmeldingen":
        break;
      case "Gastenlijst":
        break;
      case "Plaats":
        dialogs.alert({
          title: "Plaats",
          message: "Het evenement vindt plaats in: \n \n" + this.location,
          okButtonText: "Sluit"
        });
        break;
    }
  }

}

class InformationButton {
  private firstArgument: string;
  private secondArgument: any;

  constructor(firstArgument, secondArgument) {
    this.firstArgument = firstArgument;
    this.secondArgument = secondArgument;
  }

}
