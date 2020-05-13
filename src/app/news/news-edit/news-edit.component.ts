import { Component, OnInit } from '@angular/core';
import { action, ActionOptions } from "tns-core-modules/ui/dialogs";
import { confirm, ConfirmOptions } from "tns-core-modules/ui/dialogs";


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

  displayActionDialog() {
    // >> action-dialog-code
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

  displayConfirmDialog() {
    // >> confirm-dialog-code
    const options = {
      title: "Weet u zeker dat u de wijziging wilt aanbrengen?",
      okButtonText: "Wijzig",
      cancelButtonText: "Annuleer"
    };

    confirm(options).then((result: boolean) => {
      console.log(result);
    });
    // << confirm-dialog-code
  }

}
