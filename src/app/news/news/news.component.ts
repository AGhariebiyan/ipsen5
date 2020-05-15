import { Component, OnInit } from '@angular/core';
import { HttpService } from "~/app/services/http.service";
import { NewsService } from "~/app/services/news.service";
import { NewsItem } from "~/app/models/NewsItem.model";

@Component({
  selector: 'ns-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {
  newsItems: Array<NewsItem> = [];

  constructor(
      private newsService: NewsService,
      private httpService: HttpService) { }

  ngOnInit(): void {
    this.getNewsItems();
  }

  getNewsItems() {
    this.newsService.getNewsPostFromDatabase().subscribe((newsItem) => this.newsItems = newsItem);
  }

}
