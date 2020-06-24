import { Component, OnInit } from '@angular/core';
import { HttpService } from "~/app/services/http.service";
import { NewsService } from "~/app/services/news.service";
import { NewsItem } from "~/app/models/NewsItem.model";
import { Observable, BehaviorSubject } from "rxjs";
import { ActivatedRoute, Resolve, Router } from "@angular/router";
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

    showableItems: NewsItem[];

  newsItems: NewsItem[];
  featuredNewsItems: NewsItem[];
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
        this.updateNews();
    }

    updateNews() {
        this.getNews().subscribe(items => {
            this.newsItems = items;
            if (!this.featured) this.showableItems = this.newsItems;
        });
        this.getFeaturedNews().subscribe(items => {
            this.featuredNewsItems = items;
            if (this.featured) {
                console.log(items)
                this.showableItems = this.featuredNewsItems
            };
        })
    }

  getNews() {
    return this.newsService.getItems();
  }

  getFeaturedNews() {
    return this.newsService.getFeaturedItems();
  }

  getUserData(id: string) {
    this.accountService.getUser(id).subscribe((user) => {
      this.userName.next(user.firstName);
    });

  }

    selectFeatured() {
        this.featured = !this.featured
      this.updateNews();
  }
}
