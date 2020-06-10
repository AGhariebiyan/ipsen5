import { Component, OnInit } from '@angular/core';
import { HttpService } from "~/app/services/http.service";
import { NewsService } from "~/app/services/news.service";
import { NewsItem } from "~/app/models/NewsItem.model";
import { Observable, BehaviorSubject } from "rxjs";
import { Resolve, Router} from "@angular/router";
import { RouterExtensions } from '@nativescript/angular/router/router.module';
import { SegmentedBarItem } from "tns-core-modules/ui";
import { AccountService } from "~/app/services/account.service";
import { resolve } from "@ngtools/webpack/src/refactor";
import { Account } from "~/app/models/Account.model";

@Component({
  selector: 'ns-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css'],
  providers: [NewsService]
})
export class NewsComponent implements OnInit {
  newsItems: Observable<NewsItem[]>;
  featuredNewsItems: Observable<NewsItem[]>;
  account: Observable<Account>;
  segmentedBarItems: Array<SegmentedBarItem> = [];
  featured: boolean = false;
  userName: BehaviorSubject<string> = new BehaviorSubject<string>(null);
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

  printHallo() {
    console.log("hallloo");

    return "hallo";
  }

  getNews() {
    return this.newsService.getItems();
  }

  getFeaturedNews() {
    return this.newsService.getFeaturedItems(this.featured);
  }

  getUserData(id: string) {
    this.accountService.getUser(id).subscribe((user) => {
      console.log(user.firstName);

      this.userName.next(user.firstName);

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

    openUserProfile() {
        this.routerExtensions.navigate(['userprofile', this.accountService.account.id])
    }
}
