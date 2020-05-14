import { Component, OnInit } from '@angular/core';
import { action, ActionOptions, confirm, ConfirmOptions } from "tns-core-modules/ui/dialogs";

@Component({
  selector: 'ns-news-edit',
  templateUrl: './news-edit.component.html',
  styleUrls: ['./news-edit.component.css']
})
export class NewsEditComponent implements OnInit {
  userType = "";

  constructor() { }

  ngOnInit(): void {
  }

  // Dialoog venster voor het selecteren van type.
  displayActionDialog() {
    const options = {
      title: "Plaatsen als:",
      message: "Selecteer type",
      cancelButtonText: "Annuleer",
      actions: ["Human", "Elf", "Dwarf", "Orc", "Unicorn"]
    };

    action(options).then((result) => {
      if (result === 'Annuleer') {
        this.userType = "";
      } else {
        this.userType = result;
      }
    });
  }

  // Dialoog voor de controle van de gebruiker voor het wijzigen.
  displayConfirmDialog() {
    const options = {
      title: "Weet u zeker dat u het nieuwsbericht wilt verwijderen?",
      okButtonText: "Verwijder",
      cancelButtonText: "Annuleer"
    };

    confirm(options).then((result: boolean) => {
      console.log(result);
    });
  }

}
