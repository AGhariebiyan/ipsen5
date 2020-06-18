import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { action, ActionOptions, confirm, ConfirmOptions } from "tns-core-modules/ui/dialogs";
import { NewsService } from "~/app/services/news.service";
import { ActivatedRoute } from "@angular/router";
import { Page } from "tns-core-modules/ui/page";
import { RouterExtensions } from "nativescript-angular/router";
import { AccountService } from "~/app/services/account.service";
import { KbaseService } from "~/app/services/kbase.service";
import { ActionBar } from "tns-core-modules/ui/action-bar";
import { isIOS } from "tns-core-modules/platform";
import * as dialogs from "tns-core-modules/ui/dialogs";
import { NewsItem } from "~/app/models/NewsItem.model";
import { KBase } from "~/app/models/KBase.model";

@Component({
  selector: 'ns-kbase-edit',
  templateUrl: './kbase-edit.component.html',
  styleUrls: ['./kbase-edit.component.css']
})
export class KbaseEditComponent implements OnInit {
  articleId = this.activatedRoute.snapshot.params.articleId;
  form: FormGroup;

  articleEditId: string;
  articleTitle = "";
  articleDescription = "";
  date = new Date();
  published: boolean;
  accountId: string;

  constructor(
      private kbaseService: KbaseService,
      private activatedRoute: ActivatedRoute,
      private page: Page,
      private routerExtensions: RouterExtensions,
      private accountService: AccountService) { }

  ngOnInit(): void {

    this.getArticleItem();

    this.form = new FormGroup({
      articleTitle: new FormControl(null, { updateOn: 'change', validators: [Validators.required]}),
      articleDescription: new FormControl(null, { updateOn: 'change', validators: [Validators.required]})
    });
  }

  getArticleItem() {
    this.kbaseService.getItem(this.articleId).subscribe((article) => {
      this.articleEditId = article.id;
      this.articleTitle = article.title;
      this.articleDescription = article.content;
      this.published = article.published;
      this.accountId = article.accountId;

    });
  }

  onBarLoaded($event) {
    const bar: ActionBar = this.page.getViewById<ActionBar>("bar");
    const navigationBar = bar.nativeView;

    if (isIOS) {
      navigationBar.prefersLargeTitles = false;
    }
  }

  displayConfirmDialogSave() {
    const options = {
      title: "Weet u zeker dat u het artikel wilt wijzigen?",
      okButtonText: "Opslaan",
      cancelButtonText: "Annuleer"
    };
    confirm(options).then((result: boolean) => {
      if (result === true
          && this.form.get("articleTitle").value !== ""
          && this.form.get("articleTitle").value !== null && this.form.get("articleDescription").value !== ""
          && this.form.get("articleDescription").value !== null) {
        this.onSubmit();
        this.routerExtensions.back();
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

  onSubmit() {
    const articleTitle = this.form.get("articleTitle").value;
    const articleDescription = this.form.get("articleDescription").value;

    const article = new KBase(articleTitle, articleDescription, new Date(),
        this.published, this.accountId, this.articleEditId);

    const requestBody = {
      Id: article.id,
      Title: article.title,
      Content: article.content,
      Date: this.date,
      Published: article.published,
      AccountId: this.accountService.account.id,
    };

    const body = JSON.stringify(requestBody);

    this.kbaseService.makePutRequest(this.articleId, body);
  }

  // Dialoog voor de controle van de gebruiker voor het verwijderen.
  displayConfirmDialogDelete() {
    const options = {
      title: "Weet u zeker dat u dit artikel wilt verwijderen?",
      okButtonText: "Verwijder",
      cancelButtonText: "Annuleer"
    };

    confirm(options).then((result: boolean) => {
      if (result === true) {
        this.deleteNewsPost();
      } else {
        console.log("niet verwijderd");
      }

    });
  }

  deleteNewsPost() {
    this.kbaseService.deleteArticle(this.articleId);
    this.routerExtensions.back();
    this.routerExtensions.back();
  }

}
