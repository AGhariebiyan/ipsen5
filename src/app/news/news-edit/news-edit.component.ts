import { Component, OnInit } from '@angular/core';
import { action, ActionOptions, confirm, ConfirmOptions } from "tns-core-modules/ui/dialogs";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { NewsService } from "~/app/services/news.service";
import { NewsItem } from "~/app/models/NewsItem.model";
import { ActivatedRoute } from "@angular/router";
import { ActionBar } from "tns-core-modules/ui/action-bar";
import { isIOS } from "tns-core-modules/platform";
import { Page } from "tns-core-modules/ui/page";
import { RouterExtensions } from "nativescript-angular/router";

@Component({
  selector: 'ns-news-edit',
  templateUrl: './news-edit.component.html',
  styleUrls: ['./news-edit.component.css']
})
export class NewsEditComponent implements OnInit {
  newsId = this.activatedRoute.snapshot.params.newsId;
  form: FormGroup;

  newsPostId: string;
  newsTitle = "";
  newsDescription = "";
  date = new Date();
  deleted: boolean;
  published: boolean;
  accountId: string;
  companyId: string;
  featured: boolean;

  constructor(
      private newsService: NewsService,
      private activatedRoute: ActivatedRoute,
      private page: Page,
      private routerExtensions: RouterExtensions) { }

  ngOnInit(): void {

    this.getNewsItem();

    this.form = new FormGroup({
      newsTitle: new FormControl(null, { updateOn: 'change', validators: [Validators.required]}),
      newsDescription: new FormControl(null, { updateOn: 'change', validators: [Validators.required]}),
      userType: new FormControl(null, { updateOn: 'change', validators: [Validators.required]})
    });
  }

  getNewsItem() {
    this.newsService.getItem(this.newsId).subscribe((newsItem) => {
      this.newsPostId = newsItem.id;
      this.newsTitle = newsItem.title;
      this.newsDescription = newsItem.content;
      this.deleted = newsItem.deleted;
      this.published = newsItem.published;
      this.accountId = newsItem.account;
      this.companyId = newsItem.company;
      this.featured = newsItem.featured;

    });
  }

  onBarLoaded($event) {
    let bar: ActionBar = this.page.getViewById<ActionBar>("bar");
    let navigationBar = bar.nativeView;

    if (isIOS) {
      navigationBar.prefersLargeTitles = false;
    }
  }

  // Dialoog voor de controle van de gebruiker voor het wijzigen.
  displayConfirmDialogSave() {
    const options = {
      title: "Weet u zeker dat u het nieuwsbericht wilt wijzigen?",
      okButtonText: "Opslaan",
      cancelButtonText: "Annuleer"
    };
    confirm(options).then((result: boolean) => {
      this.onSubmit();
      this.routerExtensions.back();
    });
  }

  // Wijzigingen aanbrengen
  onSubmit() {
    const newsTitle = this.form.get("newsTitle").value;
    const newsDescription = this.form.get("newsDescription").value;

    const newsitem = new NewsItem(newsTitle, newsDescription, new Date(), this.deleted,
        this.published, this.accountId, this.companyId , this.featured, this.newsPostId);

    const requestBody = {
      Id: newsitem.id,
      Title: newsitem.title,
      Content: newsitem.content,
      Date: this.date,
      Deleted: newsitem.deleted,
      Published: newsitem.published,
      AccountId: newsitem.account,
      CompanyId: newsitem.company,
      Featured: newsitem.featured
    };

    const body = JSON.stringify(requestBody);

    this.newsService.makePutRequest(this.newsId, body);
  }

  // Dialoog venster voor het selecteren van type.
  displayActionDialog() {
    const options = {
      title: "Plaatsen als:",
      message: "Selecteer type",
      cancelButtonText: "Annuleer",
      actions: ["Mijzelf"]
    };

    action(options).then((result) => {
      if (result === "annuleren") {
        this.accountId = "";
        this.companyId = "";
      } else if (result === "Mijzelf") {
        this.accountId = "";
        this.companyId = "";
      }
    });
  }

  // Dialoog voor de controle van de gebruiker voor het verwijderen.
  displayConfirmDialogDelete() {
    const options = {
      title: "Weet u zeker dat u het nieuwsbericht wilt verwijderen?",
      okButtonText: "Verwijder",
      cancelButtonText: "Annuleer"
    };

    confirm(options).then((result: boolean) => {
      this.deleteNewsPost();
    });
  }

  deleteNewsPost() {
    this.newsService.deleteNewspost(this.newsId);
    this.routerExtensions.back();
  }
}
