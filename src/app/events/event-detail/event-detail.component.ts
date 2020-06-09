import { Component, OnInit } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular';
import { Event } from "~/app/shared/models/event.model";
import { ActivatedRoute } from "@angular/router";
import * as dialogs from "tns-core-modules/ui/dialogs";
import { ParticipantService } from "~/app/services/participant.service";
import { Participant } from "~/app/shared/models/participant";
import { EventResponse } from "~/app/shared/models/event-response.model";
import { AccountService } from '~/app/services/account.service';
import { EventService } from '~/app/services/event.service';

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
  isRegistered: boolean;

  constructor(
    private routerExtensions: RouterExtensions, 
    private activeRoute: ActivatedRoute,
    private service: ParticipantService,
    private accountService: AccountService,
    private eventsService: EventService
    ) {
  }

  /**
   * @author Valerie Timmerman
   *
   * When the class is created the JSON object passed by the overview page gets parsed and put as a global variable.
   */
  ngOnInit(): void {
    this.activeRoute.queryParams.subscribe(params => {
      this.event = JSON.parse(params["event"]);
      this.isRegistered = params["isRegistered"];
    });
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
      actions: ["Aanpassen", "Delen", "Verwijderen"]
    }).then(result => {
      switch (result) {
        case "Verwijderen":
          this.deleteEvent(this.event.id)
          break;
        default:
          console.log(result);
          break;
      } 
    });
  }

  deleteEvent(id: string) {
    this.eventsService.deleteEvent(id).subscribe(result => {
      this.eventsService.getEvents()
      this.goBack()
    })
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

  private registerForEvent() {
    this.accountService.account$.subscribe(account => {
      let participant = new Participant(this.event.id, account.id);
      this.service.registerParticipant(participant);
    })
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

  openUnRegister() {
    dialogs.confirm({
      title: "Uitschrijven",
      message: "Weet u zeker dat u zich wilt uitschrijven voor dit evenement?",
      okButtonText: "Ja",
      cancelButtonText: "Nee"
    }).then(result => {
      //Make unregister here
    })
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
