import { Component, OnInit } from '@angular/core';
import { action, ActionOptions, confirm, ConfirmOptions } from "tns-core-modules/ui/dialogs";
import { NewsItem } from "~/app/models/NewsItem.model";
import { NewsService } from "~/app/services/news.service";

@Component({
  selector: 'ns-news-add',
  templateUrl: './news-add.component.html',
  styleUrls: ['./news-add.component.css']
})
export class NewsAddComponent implements OnInit {
  userType = " ";
  constructor(private newsService: NewsService) { }
  ngOnInit(): void {
  }

  postNewsItem() {
    const newsitem = new NewsItem("Test11", "dit is een test vanuit webstorm", new Date(), false,
        false, 5, 5 , false);

    this.newsService.postItem(newsitem);
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
