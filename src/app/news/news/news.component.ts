import { Component, OnInit } from '@angular/core';
import { HttpService } from "~/app/services/http.service";
import { NewsService } from "~/app/services/news.service";
import { NewsItem } from "~/app/models/NewsItem.model";
import { Observable } from "rxjs";

@Component({
  selector: 'ns-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css'],
  providers: [NewsService]
})
export class NewsComponent implements OnInit {
  newsItems: NewsItem[] = [];

  constructor(
      private newsService: NewsService,
      private http: HttpService) { }

  ngOnInit(): void {
    // console.log("--------------" + this.http.getData("http://localhost:5000/api/newsposts"));
    // this.getNewsItems();
    console.log(this.newsItems);
    console.log("--------------------------" + this.newsService.getItems());

    // console.log(this.newsService.getItems());
    // this.newsItems = this.newsService.getItems();

  }

  getNewsItems() {
    this.newsService.getItems().subscribe((newsItems) => this.newsItems = newsItems);
  }

}
