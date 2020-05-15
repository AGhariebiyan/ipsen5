import { Component, OnInit } from '@angular/core';
import { action, ActionOptions, confirm, ConfirmOptions } from "tns-core-modules/ui/dialogs";

@Component({
  selector: 'ns-news-add',
  templateUrl: './news-add.component.html',
  styleUrls: ['./news-add.component.css']
})
export class NewsAddComponent implements OnInit {
  userType = " ";
  constructor() { }
  ngOnInit(): void {
  }

  displayActionDialog() {
    const options = {
      title: "Gebruiker",
      cancelButtonText: "annuleren",
      actions: ["Mijzelf", "Bedrijf"]
    };

    action(options).then((result) => {
      if (result === "annuleren") {
        this.userType = "";
      } else {
        this.userType = result;
      }
    });
  }

  displayConfirmDialog() {
    const options = {
      title: "Weet u zeker dat u dit bericht wilt toevoegen?",
      okButtonText: "Toevoegen",
      cancelButtonText: "Annuleer"
    };
    confirm(options).then((result: boolean) => {
      console.log(result);
    });
  }
}