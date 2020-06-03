import { Component, OnInit } from '@angular/core';
import { ActionBar } from "tns-core-modules/ui/action-bar";
import { isIOS } from "tns-core-modules/platform";
import { Page } from "tns-core-modules/ui/page";
import { ActivatedRoute } from "@angular/router";
import { NewsService } from "~/app/services/news.service";
import { AccountService } from "~/app/services/account.service";

@Component({
  selector: 'ns-news-detail',
  templateUrl: './news-detail.component.html',
  styleUrls: ['./news-detail.component.css']
})
export class NewsDetailComponent implements OnInit {

  newsId = this.activatedRoute.snapshot.params.newsId;
  newsPostId: string;
  newsTitle = "";
  newsDescription = "";
  date = Date;
  deleted: boolean;
  published: boolean;
  accountId: string;
  companyId: string;
  featured: boolean;

  constructor(
      private newsService: NewsService,
      private accountService: AccountService,
      private page: Page,
      private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.getNewsItem();
  }

  //Top actionbar
  onBarLoaded($event) {
    let bar: ActionBar = this.page.getViewById<ActionBar>("bar");
    let navigationBar = bar.nativeView;

    if (isIOS) {
      navigationBar.prefersLargeTitles = false;
    }
  }

  getNewsItem() {
    this.newsService.getItem(this.newsId).subscribe((newsItem) => {
      this.newsPostId = newsItem.id;
      this.newsTitle = newsItem.title;
      this.newsDescription = newsItem.content;
      this.deleted = newsItem.deleted;
      this.published = newsItem.published;
      this.accountId = newsItem.accountId;
      // this.companyId = newsItem.company;
      this.featured = newsItem.featured;

    });
  }

}
