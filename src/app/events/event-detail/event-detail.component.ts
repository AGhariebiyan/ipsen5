import { Component, OnInit } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular';
import { Event } from "~/app/shared/models/event.model";
import { ActivatedRoute, NavigationExtras } from "@angular/router";
import { ParticipantService } from "~/app/services/participant.service";
import { Participant } from "~/app/shared/models/participant";
import { EventResponse } from "~/app/shared/models/event-response.model";
import { AccountService } from '~/app/services/account.service';
import { DialogService } from "~/app/services/dialog.service";
import * as dialogs from "tns-core-modules/ui/dialogs";
import { EventService } from "~/app/services/event.service";
import { PermissionRole } from "~/app/models/PermissionRole.model";

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
  registrations = [];

  constructor(private routerExtensions: RouterExtensions, private activeRoute: ActivatedRoute,
              private service: ParticipantService, private accountService: AccountService,
              private dialogService: DialogService, private eventService: EventService) {
  }

  /**
   * @author Valerie Timmerman
   *
   * When the class is created the JSON object passed by the overview page gets parsed and put as a global variable.
   */
  ngOnInit(): void {

    let subscription = this.activeRoute.queryParams;

    subscription.subscribe(params => {
      this.event = JSON.parse(params["event"]);
      if(params["isRegistered"] == 'true') {
        this.isRegistered = true;
      } else {
        this.isRegistered = false;
      }
    }).unsubscribe();

    this.eventService.changedEvent.subscribe(event => this.event = event);

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
    let actions = [];
    if(this.accountService.account.role.internalName == 'admin' ||
        this.accountService.account.role.internalName == 'board-member') {
      actions = ["Aanpassen", "Delen"];
    } else {
      actions = ["Delen"];
    }
    this.dialogService.showActions("Opties", "", actions)
    .then(result => {
      if(result === "Aanpassen"){
        this.editEvent();
      }
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
            this.isRegistered = true;
            this.getRegistrations().then(() => this.updateButton());
            this.dialogService.showDialog("Inschrijven","U bent nu ingeschreven voor het evenement.");
          }).catch(() => {
            this.dialogService.showDialog("Let op!", "Er ging iets mis tijdens het inschrijven, " +
                "probeer het later opnieuw of neem contact op met de systeembeheerder.")
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
      this.service.deleteParticipant(participant, this.registrations).then(() => {
        this.isRegistered = false;
        this.getRegistrations().then(() => this.updateButton());
        this.dialogService.showDialog("Uitschrijven", "U bent nu succesvol uitgeschreven.");
      }).catch(() => {
        this.dialogService.showDialog("Let op!", "Er ging iets mis, probeer het later opnieuw of " +
            "neem contact op met de systeembeheerder.");
      });
    })
  }

  updateButton(){
    let button = this.options[0];
    button.secondArgument = this.registrations.length;
  }

  private setButtons() {
    let button1 = new InformationButton("Aanmeldingen", this.registrations.length);
    let button2 = new InformationButton("Gastenlijst", '>');
    let button3 = new InformationButton("Plaats", "ⓘ");
    this.options.push(button1, button2, button3);
  }

  private editEvent() {
    let navigateExtras: NavigationExtras = {
      relativeTo: this.activeRoute,
      queryParams: {
        event: JSON.stringify(this.event),
      }
    };
    this.routerExtensions.navigate(['../edit'], navigateExtras);
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
