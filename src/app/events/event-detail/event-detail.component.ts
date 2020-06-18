import { Component, OnInit } from '@angular/core';
import { RouterExtensions } from '@nativescript/angular';
import { ActivatedRoute, NavigationExtras } from "@angular/router";
import { ParticipantService } from "~/app/services/participant.service";
import { Participant } from "~/app/models/participant";
import { EventResponse } from "~/app/models/event-response.model";
import { AccountService } from '~/app/services/account.service';
import { DialogService } from "~/app/services/dialog.service";
import { EventService } from "~/app/services/event.service";

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
  isExpired: boolean = false;

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

    this.setEvent();
    this.checkExpiration();
    this.setButtons();

  }

  /**
   * @author Valerie Timmerman
   *
   * This method is called from the NgOnInit and gets the event to be displayed from the parameters passed by the
   * event-list component by subscribing to it. Then it unsubscribed from this and subscribes to an event emitter that
   * sends a signal whenever the event in here is changed so it can be live updated. Set location is called whenever the
   * event is set (again).
   */
  private setEvent() {
    let subscription = this.activeRoute.queryParams;

    subscription.subscribe(params => {
      this.event = JSON.parse(params["event"]);
      if(params["isRegistered"] == 'true') {
        this.isRegistered = true;
      } else {
        this.isRegistered = false;
      }
    }).unsubscribe();

    this.setLocation();

    this.eventService.changedEvent.subscribe(event => {
      this.event = event;
      this.setLocation();
    });
  }

  /**
   * @author Valerie Timmerman
   *
   * Makes text to display on the location popup.
   */
  setLocation() {
    this.location = this.event.eventLocationStreet + "\n" + this.event.eventLocationPostalCode + "\n" +
        this.event.eventLocationName + "\n" + this.event.eventLocationRegion + "\n" +
        this.event.eventLocationCountry;
  }

  /**
   * @author Valerie Timmerman
   *
   * Gets all the participants for this event to display how many people are registered.
   */
  async getRegistrations() {
    await this.service.getParticipantsForEvent(this.event.id).then(result => {
      this.registrations = result;
    });
  }

  goBack() {
    this.routerExtensions.back();
  }

  /**
   * @author Valerie Timmerman and Waly Kerkeboom
   *
   * Opens a options menu, if the user is an admin or board-member they can edit or delete an event on top of just
   * sharing like normal users.
   */
  openActions() {
    let actions = [];
    if(this.accountService.account.role.internalName == 'admin' ||
        this.accountService.account.role.internalName == 'board-member') {
      if(!this.isExpired) {
        actions = ["Aanpassen", "Delen", "Verwijderen"];
      } else {
        actions = ["Delen", "Verwijderen"];
      }
    } else {
      actions = ["Delen"];
    }
    this.dialogService.showActions("Opties", null, actions)
    .then(result => {
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
    .then(result => {
      if (result) {
        this.deleteEvent()
      }
    });
  }

  deleteEvent() {
    this.eventService.deleteEvent(this.event.id).then(() => {
      this.eventService.refreshAllEvents().then(() => this.goBack())
    }, () => this.dialogService.showDialog("Er is een fout opgetreden", "Deze actie kon niet worden voltooid. Probeer later opnieuw."))
  }

  /**
   * @author Valerie Timmerman
   *
   * Opens a popup for registration.
   */
  openRegister() {
    this.dialogService.showConfirm("Inschrijven",
        "Weet u zeker dat u zich wilt inschrijven voor dit evenement?")
   .then(result => {
      if(result) {
        this.registerForEvent();
      }
    });
  }

  /**
   * @author Valerie Timmerman
   *
   * Registers the user for the event and updates the register button, participant count and reloads the events loaded
   * in the event-list component and then shows a popup to show the user if the registration was successful or not.
   */
  private registerForEvent() {
    this.service.registerParticipant(this.event.id).then(() => {
      this.isRegistered = true;
      this.getRegistrations().then(() => this.updateButton());
      this.dialogService.showDialog("Inschrijven","U bent nu ingeschreven voor het evenement.");
      this.eventService.getUserEvents()
    }).catch(() => {
      this.dialogService.showDialog("Let op!", "Er ging iets mis tijdens het inschrijven, " +
          "probeer het later opnieuw of neem contact op met de systeembeheerder.")
    });
  }

  /**
   * @author Valerie Timmerman
   * @param event click event
   *
   * Reacts to taps on the list with information and shows corresponding information.
   */
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

  /**
   * @author Valerie Timmerman
   *
   * Opens popup for unregistering.
   */
  openUnRegister() {
    this.dialogService.showConfirm("Uitschrijven", "Weet u zeker dat u zich wilt uitschrijven voor dit evenement?")
    .then(result => {
      if(result) {
        this.unRegister();
      }
    })
  }

  /**
   * @author Valerie Timmerman
   *
   * Handles unregistering the user from the event and then resets everything related to this.
   */
  private unRegister() {
    this.service.deleteParticipant(this.event.id).then(() => {
      this.isRegistered = false;
      this.getRegistrations().then(() => this.updateButton());
      this.dialogService.showDialog("Uitschrijven", "U bent nu succesvol uitgeschreven.");
      this.eventService.getUserEvents()
    }).catch(() => {
      this.dialogService.showDialog("Let op!", "Er ging iets mis, probeer het later opnieuw of " +
          "neem contact op met de systeembeheerder.");
    });
  }

  /**
   * @author Valerie Timmerman
   *
   * This button shows the amount of registrations on this event.
   */
  updateButton(){
    let button = this.options[0];
    button.secondArgument = this.registrations.length;
  }

  /**
   * @author Valerie Timmerman
   *
   * This sets the buttons in the list with information.
   */
  private setButtons() {
    let button1 = new InformationButton("Aanmeldingen", this.event.participants.length);
    let button2 = new InformationButton("Gastenlijst", '>');
    let button3 = new InformationButton("Plaats", "ⓘ");
    this.options.push(button1, button2, button3);
  }

  /**
   * @author Valerie Timmerman
   *
   * When the user is authorized for this operation, they are navigated to the page for editing events.
   */
  private editEvent() {
    let navigateExtras: NavigationExtras = {
      relativeTo: this.activeRoute,
      queryParams: {
        event: JSON.stringify(this.event),
      }
    };
    this.routerExtensions.navigate(['../edit'], navigateExtras);
  }

  /**
   * @author Valerie Timmerman
   *
   * Checks if the event took place in the past, since the user can't enter expired events.
   */
  private checkExpiration() {
    let date = new Date(this.event.eventDate);
    let today = new Date();
    today.setHours(0,0,0,0);
    if(date < today && date != today) {
      this.isExpired = true;
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
