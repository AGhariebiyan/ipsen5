import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular";
import { Event } from "~/app/models/event.model";
import { ActivatedRoute, NavigationExtras } from "@angular/router";
import { ParticipantService } from "~/app/services/participant.service";
import { Participant } from "~/app/models/participant";
import { EventResponse } from "~/app/models/event-response.model";
import { AccountService } from "~/app/services/account.service";
import { DialogService } from "~/app/services/dialog.service";
import * as dialogs from "tns-core-modules/ui/dialogs";
import { EventService } from "~/app/services/event.service";
import { PermissionRole } from "~/app/models/PermissionRole.model";
import { flatMap } from "rxjs/operators";

@Component({
  selector: "ns-event-detail",
  templateUrl: "./event-detail.component.html",
  styleUrls: ["./event-detail.component.css"]
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

    const subscription = this.activeRoute.queryParams;

    subscription.subscribe((params) => {
      this.event = JSON.parse(params.event);
      if (params.isRegistered == "true") {
        this.isRegistered = true;
      } else {
        this.isRegistered = false;
      }
    }).unsubscribe();

    this.eventService.changedEvent.subscribe((event) => this.event = event);

    this.getRegistrations().then(() => this.setButtons());
    this.location = this.event.eventLocationStreet + "\n" + this.event.eventLocationPostalCode + "\n" +
        this.event.eventLocationName + "\n" + this.event.eventLocationRegion + "\n" +
        this.event.eventLocationCountry;
  }

  async getRegistrations() {
    await this.service.getParticipantsForEvent(this.event.id).then((result) => {
      this.registrations = result;
    });
  }

  goBack() {
    this.routerExtensions.back();
  }

  openActions() {
    let actions = [];
    if (this.accountService.account.role.internalName == "admin" ||
        this.accountService.account.role.internalName == "board-member") {
      actions = ["Aanpassen", "Delen", "Verwijderen"];
    } else {
      actions = ["Delen", "Aanpassen", "Verwijderen"];
    }
    this.dialogService.showActions("Opties", null, actions)
    .then((result) => {
      switch (result) {
        case "Aanpassen":
          this.editEvent();
          break;
        case "Verwijderen":
          this.confirmDeletion();
          break;
        default:
          break;
      }
    });
  }

  confirmDeletion() {
    this.dialogService.showConfirm("Evenement Verwijderen", "Weet u zeker dat u dit evenement wil verwijderen?")
    .then((result) => {
      if (result) {
        this.deleteEvent();
      }
    });
  }

  deleteEvent() {
    // this.eventService.deleteEvent(this.event.id).subscribe((result) => {
    //   this.eventService.getEvents().then(() => this.goBack())
    // }, error => {
    //   this.dialogService.showDialog("Er is iets fout gegaan", "Probeer het later opnieuw")
    // })
    // this.eventService.deleteEvent(this.event.id).subscribe(() => this.eventService.refreshAllEvents().then(() => this.goBack()),
    // () => this.dialogService.showDialog("Er is iets fout gegaan", "Probeer het later opnieuw"))
    this.eventService.deleteEvent(this.event.id).then(() => {
      this.eventService.refreshAllEvents().then(() => this.goBack());
    }, () => this.dialogService.showDialog("Er is een fout opgetreden", "Deze actie kon niet worden voltooid. Probeer later opnieuw."));
  }

  openRegister() {
    this.dialogService.showConfirm("Inschrijven",
        "Weet u zeker dat u zich wilt inschrijven voor dit evenement?")
   .then((result) => {
      if (result) {
        this.registerForEvent();
      }
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
    .then((result) => {
      if (result) {
        this.unRegister();
      }
    });
  }

  updateButton() {
    const button = this.options[0];
    button.secondArgument = this.registrations.length;
  }

  private registerForEvent() {
    const participant = new Participant(this.event.id, this.accountService.account.id);
    this.service.registerParticipant(participant).then(() => {
      this.isRegistered = true;
      this.getRegistrations().then(() => this.updateButton());
      this.dialogService.showDialog("Inschrijven", "U bent nu ingeschreven voor het evenement.");
      this.eventService.getUserEvents();
    }).catch(() => {
      this.dialogService.showDialog("Let op!", "Er ging iets mis tijdens het inschrijven, " +
          "probeer het later opnieuw of neem contact op met de systeembeheerder.");
    });
  }

  private unRegister() {
    const participant = new Participant(this.event.id, this.accountService.account.id);
    this.service.deleteParticipant(participant, this.registrations).then(() => {
      this.isRegistered = false;
      this.getRegistrations().then(() => this.updateButton());
      this.dialogService.showDialog("Uitschrijven", "U bent nu succesvol uitgeschreven.");
      this.eventService.getUserEvents();
    }).catch(() => {
      this.dialogService.showDialog("Let op!", "Er ging iets mis, probeer het later opnieuw of " +
          "neem contact op met de systeembeheerder.");
    });
  }

  private setButtons() {
    const button1 = new InformationButton("Aanmeldingen", this.registrations.length);
    const button2 = new InformationButton("Gastenlijst", ">");
    const button3 = new InformationButton("Plaats", "ⓘ");
    this.options.push(button1, button2, button3);
  }

  private editEvent() {
    const navigateExtras: NavigationExtras = {
      relativeTo: this.activeRoute,
      queryParams: {
        event: JSON.stringify(this.event)
      }
    };
    this.routerExtensions.navigate(["..", "edit"], navigateExtras);
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
