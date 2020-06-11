import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { isIOS } from "tns-core-modules/platform";
import { ActionBar } from "tns-core-modules/ui/action-bar";
import { Page } from 'tns-core-modules/ui/page';
import { confirm } from "tns-core-modules/ui/dialogs";
import { RouterExtensions } from '@nativescript/angular/router/router.module';

@Component({
  selector: 'ns-action-bar-news',
  templateUrl: './action-bar-news.component.html',
  styleUrls: ['./action-bar-news.component.css']
})
export class ActionBarNewsComponent implements OnInit {
  // titleText="wijzig bericht"

  @Output("onSave") onSave = new EventEmitter();

  constructor(private page: Page,
              private router: RouterExtensions) { }

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
      this.onSave.emit();
      console.log(result);
    });
  }

  goBack(){
    this.router.back();
  }

}
