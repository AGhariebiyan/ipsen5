import { Component, OnInit } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular';
import { Event } from "~/app/shared/models/event.model";
import { ActivatedRoute } from "@angular/router";
import { ParticipantService } from "~/app/services/participant.service";
import { Participant } from "~/app/shared/models/participant";
import { EventResponse } from "~/app/shared/models/event-response.model";
import { AccountService } from '~/app/services/account.service';
import { DialogService } from "~/app/services/dialog.service";

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
  isRegistered: any;
  registrations = [];

  constructor(private routerExtensions: RouterExtensions, private activeRoute: ActivatedRoute,
              private service: ParticipantService, private accountService: AccountService,
              private dialogService: DialogService) {
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

    this.getRegistrations().then(() => this.setButtons());
    this.location = this.event.eventLocationStreet + "\n" + this.event.eventLocationPostalCode + "\n" +
        this.event.eventLocationName + "\n" + this.event.eventLocationRegion + "\n" +
        this.event.eventLocationCountry;
  }

  async getRegistrations() {
    await this.service.getParticipantsForEvent(this.event.id).then(result => {
      this.registrations = result;
    });
  }

  goBack() {
    this.routerExtensions.back();
  }

  openActions() {
    this.dialogService.showActions("Opties", "", ["Aanpassen", "Delen"])
    .then(result => {
      console.log("Dialog result: " + result);
    });
  }

  openRegister() {
    this.dialogService.showConfirm("Inschrijven",
        "Weet u zeker dat u zich wilt inschrijven voor dit evenement?")
   .then(result => {
      if(result) {
        this.registerForEvent();
      }
    });
  }

  private registerForEvent() {
    this.accountService.account$.subscribe(account => {
      let participant = new Participant(this.event.id, account.id);
      this.service.registerParticipant(participant).then(() => {
            this.isRegistered = 'true';
            this.getRegistrations().then(() => this.updateButton());
          }).catch(() => {
        console.log("Error");
      });
    });
  }

  openInformation(event) {
    switch (event.firstArgument) {
      case "Aanmeldingen":
        break;
      case "Gastenlijst":
        break;
      case "Plaats":
        this.dialogService.showDialog("Plaats", "Het evenement vindt plaats in: \n \n" + this.location);
        break;
    }
  }

  openUnRegister() {
    this.dialogService.showConfirm("Uitschrijven", "Weet u zeker dat u zich wilt uitschrijven voor dit evenement?")
    .then(result => {
      if(result) {
        this.unRegister();
      }
    })
  }

  private unRegister() {
    this.accountService.account$.subscribe(account => {
      let participant = new Participant(this.event.id, account.id);
      this.service.deleteParticipant(participant).then(() => {
        this.isRegistered = 'false';
        this.getRegistrations().then(() => this.updateButton());
      }).catch(() => {
        console.log("Error");
      });
    })
  }

  updateButton(){
    let button = this.options[0];
    button.secondArgument = this.registrations.length;
  }

  private setButtons() {
    let button1 = new InformationButton("Aanmeldingen", this.registrations.length);
    let button2 = new InformationButton("Gastenlijst", ">");
    let button3 = new InformationButton("Plaats", "i");
    this.options.push(button1, button2, button3);
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
