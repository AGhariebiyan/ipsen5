import { Component, OnInit } from '@angular/core';
import { HttpService } from "~/app/services/http.service";
import { NewsService } from "~/app/services/news.service";
import { NewsItem } from "~/app/models/NewsItem.model";
import { Observable } from "rxjs";
import { Router } from "@angular/router";
import { RouterExtensions } from '@nativescript/angular/router/router.module';
import { SegmentedBarItem } from "tns-core-modules/ui";
import { AccountService } from "~/app/services/account.service";

@Component({
  selector: 'ns-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css'],
  providers: [NewsService]
})
export class NewsComponent implements OnInit {
  newsItems: Observable<NewsItem[]>;
  featuredNewsItems: Observable<NewsItem[]>;
  segmentedBarItems: Array<SegmentedBarItem> = [];
  featured: boolean = false;
  userName: string = "hallo";
  profilePicture: string;


  constructor(private newsService: NewsService,
              private accountService: AccountService,
              private routerExtensions: RouterExtensions) {
    const featuredTab = new SegmentedBarItem();
    const allNews = new SegmentedBarItem();

    featuredTab.title = "Uitgelicht";
    allNews.title = "Alle Nieuws";

    this.segmentedBarItems.push(featuredTab);
    this.segmentedBarItems.push(allNews);
  }

  ngOnInit(): void {
    this.newsItems = this.newsService.getItems();
    this.featuredNewsItems = this.getFeaturedNews();
  }

  getNews() {
    return this.newsService.getItems();
  }

  getFeaturedNews() {
    return this.newsService.getFeaturedItems(this.featured);
  }

  getUserData(id: string) {
    this.accountService.getUser(id).subscribe((user) => {
      const userName = user.firstName + user.middleName + user.lastName;
      console.log(userName);

      return userName;
    });
  }

  selectFeatured() {
    const newsItems = this.getNews();

    this.featured = !this.featured;

    if (!this.featured) {
      this.newsItems = newsItems;

    } else {
      this.newsItems = this.featuredNewsItems;
    }
  }


  openProfile() {
    this.routerExtensions.navigate(['profile']);
  }
}
