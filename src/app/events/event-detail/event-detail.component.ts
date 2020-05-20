import { Component, OnInit } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular';
import { Event } from "~/app/shared/models/event.model";
import { ActivatedRoute } from "@angular/router";
import * as dialogs from "tns-core-modules/ui/dialogs";

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
  event: Event;
  options: Array<String> = ["Aanmeldingen", "Gastenlijst", "Locatie"];
  register: string = "Inschrijven";

  constructor(private routerExtensions: RouterExtensions, private activeRoute: ActivatedRoute) {
  }

  /**
   * @author Valerie Timmerman
   *
   * When the class is created the JSON object passed by the overview page gets parsed and put as a global variable.
   */
  ngOnInit(): void {
    this.activeRoute.queryParams.subscribe(params => {this.event = JSON.parse(params["event"])});
  }

  goBack() {
    this.routerExtensions.back();
  }

  openActions() {
    dialogs.action({
      cancelButtonText: "Annuleer",
      actions: ["Aanpassen", "Delen"]
    }).then(result => {
      console.log("Dialog result: " + result);
    });
  }

  openPopup() {
    dialogs.confirm({
      title: "Inschrijven",
      message: "Weet u zeker dat u zich wilt inschrijven voor dit evenement?",
      okButtonText: "Ja",
      cancelButtonText: "Nee"
    }).then(result => {
      this.showConfirmation(result);
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

}
