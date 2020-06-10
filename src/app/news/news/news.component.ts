import { Component, OnInit } from '@angular/core';
import { HttpService } from "~/app/services/http.service";
import { NewsService } from "~/app/services/news.service";
import { NewsItem } from "~/app/models/NewsItem.model";
import { Observable } from "rxjs";
import { Router } from "@angular/router";
import { RouterExtensions } from '@nativescript/angular/router/router.module';

@Component({
  selector: 'ns-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css'],
  providers: [NewsService]
})
export class NewsComponent implements OnInit {
  newsItems: Observable<NewsItem[]>;

  constructor(private newsService: NewsService,
              private routerExtensions: RouterExtensions) { }

  ngOnInit(): void {
    this.newsItems = this.newsService.getItems();
  }


  openProfile() {
    this.routerExtensions.navigate(['profile']);
  }
}
