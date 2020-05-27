import { Component, OnInit } from '@angular/core';
import { action, ActionOptions, confirm, ConfirmOptions } from "tns-core-modules/ui/dialogs";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { NewsService } from "~/app/services/news.service";
import { NewsItem } from "~/app/models/NewsItem.model";
import { AccountService } from "~/app/services/account.service";

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
              private accountService: AccountService) { }
  ngOnInit(): void {

    this.form = new FormGroup({
      newsTitle: new FormControl(null, { updateOn: 'change', validators: [Validators.required]}),
      newsDescription: new FormControl(null, { updateOn: 'change', validators: [Validators.required]}),
      userType: new FormControl(null, { updateOn: 'change', validators: [Validators.required]})
    });
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
