import { Component, OnInit } from '@angular/core';
import { action, ActionOptions, confirm, ConfirmOptions } from "tns-core-modules/ui/dialogs";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { NewsService } from "~/app/services/news.service";
import { NewsItem } from "~/app/models/NewsItem.model";
import { AccountService } from "~/app/services/account.service";
import * as dialogs from "tns-core-modules/ui/dialogs";
import { RouterExtensions } from "nativescript-angular/router";
import { ActionBar } from "tns-core-modules/ui/action-bar";
import { isIOS } from "tns-core-modules/platform";
import { ActivatedRoute } from "@angular/router";
import { Page } from "tns-core-modules/ui/page";

@Component({
  selector: 'ns-news-add',
  templateUrl: './news-add.component.html',
  styleUrls: ['./news-add.component.css']
})
export class NewsAddComponent implements OnInit {
  userId = "";
  userType = "";
  date = new Date();
  form: FormGroup;
  constructor(private newsService: NewsService,
              private accountService: AccountService,
              private page: Page,
              private routerExtensions: RouterExtensions) { }
  ngOnInit(): void {

    this.form = new FormGroup({
      newsTitle: new FormControl(null, { updateOn: 'change', validators: [Validators.required]}),
      newsDescription: new FormControl(null, { updateOn: 'change', validators: [Validators.required]}),
      userType: new FormControl(null, { updateOn: 'change', validators: [Validators.required]})
    });
  }

  onBarLoaded($event) {
    let bar: ActionBar = this.page.getViewById<ActionBar>("bar");
    let navigationBar = bar.nativeView;

    if (isIOS) {
      navigationBar.prefersLargeTitles = false;
    }
  }

  displayActionDialog() {
    const options = {
      title: "Gebruiker",
      cancelButtonText: "annuleren",
      actions: ["Mijzelf", "Bedrijf"]
    };

    action(options).then((result) => {
      if (result === "Mijzelf") {
        this.userType = result;
        this.userId = this.accountService.account.id;
      } else if (result === "Bedrijf") {
        this.userType = result;
        this.userId = this.accountService.account.id;
      } else {
        this.userType = result;
        this.userId = this.accountService.account.id;
      }
    });
  }

  onSubmit() {
    const newsTitle = this.form.get('newsTitle').value;
    const newsDescription = this.form.get('newsDescription').value;

    const newsItem = new NewsItem(newsTitle, newsDescription, new Date(), false,
        true, this.userId, true);

    const body = JSON.stringify(newsItem);

    this.newsService.makePostRequest(body);
    this.newsService.getItems();
  }

  // Dialoog voor de controle van de gebruiker voor het wijzigen.
  displayConfirmAdd() {
    const options = {
      title: "Weet u zeker dat u dit bericht wilt toevoegen?",
      okButtonText: "Toevoegen",
      cancelButtonText: "Annuleer"
    };
    confirm(options).then((result: boolean) => {
      const newsTitle = this.form.get("newsTitle").value;
      const newsDescription = this.form.get("newsDescription").value;

      if (result === true && newsTitle !== "" && newsDescription !== "" && this.userType !== "") {
        this.onSubmit();
        this.routerExtensions.back();
      } else {
        dialogs.alert({
          title: "vul alle invoervelden in",
          okButtonText: "Oke"
        }).then(() => {
          console.log("Dialog closed!");
        });
      }
    });
  }
}
