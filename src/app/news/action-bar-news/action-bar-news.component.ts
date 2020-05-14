import { Component, Input, OnInit } from '@angular/core';
import { isIOS } from "tns-core-modules/platform";
import { ActionBar } from "tns-core-modules/ui/action-bar";
import { Page } from 'tns-core-modules/ui/page';
import { confirm } from "tns-core-modules/ui/dialogs";

@Component({
  selector: 'ns-action-bar-news',
  templateUrl: './action-bar-news.component.html',
  styleUrls: ['./action-bar-news.component.css']
})
export class ActionBarNewsComponent implements OnInit {
  // titleText="wijzig bericht"

  constructor(private page: Page) { }

  ngOnInit(): void {}

  onBarLoaded($event) {
    let bar: ActionBar = this.page.getViewById<ActionBar>("bar");
    let navigationBar = bar.nativeView;

    if (isIOS) {
      navigationBar.prefersLargeTitles = false;
    }
  }

  // Dialoog voor de controle van de gebruiker voor het wijzigen.
  displayConfirmDialog() {
    const options = {
      title: "Weet u zeker dat u het nieuwsbericht wilt opslaan?",
      okButtonText: "Opslaan",
      cancelButtonText: "Annuleer"
    };
    confirm(options).then((result: boolean) => {
      console.log(result);
    });
  }

}
