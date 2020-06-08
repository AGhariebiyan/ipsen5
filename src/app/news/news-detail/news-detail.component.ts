import { Component, OnInit } from '@angular/core';
import { ActionBar } from "tns-core-modules/ui/action-bar";
import { isIOS } from "tns-core-modules/platform";
import { Page } from "tns-core-modules/ui/page";
import { ActivatedRoute } from "@angular/router";
import { NewsService } from "~/app/services/news.service";
import { AccountService } from "~/app/services/account.service";
import { Account } from "~/app/models/Account.model";

@Component({
  selector: 'ns-news-detail',
  templateUrl: './news-detail.component.html',
  styleUrls: ['./news-detail.component.css']
})
export class NewsDetailComponent implements OnInit {

  //Newspost
  newsId = this.activatedRoute.snapshot.params.newsId;
  newsPostId: string;
  newsTitle = "";
  newsDescription = "";
  date = new Date();
  deleted: boolean;
  published: boolean;
  accountId: string;
  companyId: string;
  featured: boolean;

  firstName: string;
  middleName: string;
  lastName: string;

  constructor(
      private newsService: NewsService,
      private accountService: AccountService,
      private page: Page,
      private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.getNewsItem();
    console.log(this.accountId + "NGONINIT");
    console.log("---------------" + this.newsId);
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
      this.date = newsItem.date;
      this.deleted = newsItem.deleted;
      this.published = newsItem.published;
      this.accountId = newsItem.accountId;
      // this.companyId = newsItem.company;
      this.featured = newsItem.featured;
      // this.getUser(this.accountId);
    });
  }

  // getUser(id: string) {
  //   this.accountService.getUser(id).subscribe((user) => {
  //     this.firstName = user.firstName;
  //     this.middleName = user.middleName;
  //     this.lastName = user.lastName;
  //   });
  // }

}
