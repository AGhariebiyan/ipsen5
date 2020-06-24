import { Component, OnInit } from '@angular/core';
import { ActionBar } from "tns-core-modules/ui/action-bar";
import { isIOS } from "tns-core-modules/platform";
import { Page } from "tns-core-modules/ui/page";
import { ActivatedRoute } from "@angular/router";
import { NewsService } from "~/app/services/news.service";
import { AccountService } from "~/app/services/account.service";
import { Account } from "~/app/models/Account.model";
import { Image } from "~/app/models/image.model";
import { environment } from "~/environments/environment.tns";
import { RouterExtensions } from '@nativescript/angular/router/router.module';
import { ImageService } from "~/app/services/image.service";

@Component({
  selector: 'ns-news-detail',
  templateUrl: './news-detail.component.html',
  styleUrls: ['./news-detail.component.css']
})
export class NewsDetailComponent implements OnInit {

  account: Account;

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
  loggedInUserId: string;

  firstName: string;
  middleName: string;
  lastName: string;
  profilePicture: string;

  constructor(
      private newsService: NewsService,
      private accountService: AccountService,
      private page: Page,
      private activatedRoute: ActivatedRoute,
      private router: RouterExtensions,
      private imageService: ImageService) { }

  ngOnInit(): void {
    this.account = this.accountService.account;
    this.loggedInUserId = this.accountService.account.id;
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
      this.date = newsItem.date;
      this.deleted = newsItem.deleted;
      this.published = newsItem.published;
      this.accountId = newsItem.accountId;
      // this.companyId = newsItem.company;
      this.featured = newsItem.featured;
      this.getUser(this.accountId);
    });
  }

  getUser(id: string) {
    this.accountService.getUser(id).subscribe((user) => {
      this.firstName = user.firstName;
      this.middleName = user.middleName;
      this.lastName = user.lastName;
      this.profilePicture = this.newsService.apiLocation + "/" + user.image.url;
    });
  }

  back() {
    this.router.back();
  }
}
