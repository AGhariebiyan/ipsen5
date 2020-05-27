import { Component, OnInit } from '@angular/core';
import { action, ActionOptions, confirm, ConfirmOptions } from "tns-core-modules/ui/dialogs";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { NewsService } from "~/app/services/news.service";
import { NewsItem } from "~/app/models/NewsItem.model";

@Component({
  selector: 'ns-news-add',
  templateUrl: './news-add.component.html',
  styleUrls: ['./news-add.component.css']
})
export class NewsAddComponent implements OnInit {
  userType = " ";
  date = new Date();
  form: FormGroup;
  constructor(private newsService: NewsService) { }
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
      if (result === "annuleren") {
        this.userType = "";
      } else {
        this.userType = result;
      }
    });
  }

  onSubmit() {
    const newsTitle = this.form.get('newsTitle').value;
    const newsDescription = this.form.get('newsDescription').value;

    const newsItem = new NewsItem(newsTitle, newsDescription, new Date(), false,
        true, this.userType, "1" , true);

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
