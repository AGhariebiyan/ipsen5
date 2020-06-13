import { Component, OnInit } from '@angular/core';
import { ActionBar } from "tns-core-modules/ui/action-bar";
import { isIOS } from "tns-core-modules/platform";
import { Page } from "tns-core-modules/ui/page";
import { ActivatedRoute } from "@angular/router";
import { AccountService } from "~/app/services/account.service";
import { KbaseService } from "~/app/services/kbase.service";

@Component({
  selector: 'ns-kbase-detail',
  templateUrl: './kbase-detail.component.html',
  styleUrls: ['./kbase-detail.component.css']
})
export class KbaseDetailComponent implements OnInit {

  articleId = this.activatedRoute.snapshot.params.articleId;

  kBaseItemId: string;
  articleTitle: string;
  articleContent: string;
  date: Date;
  published: boolean;
  accountId: string;

  firstName: string;
  middleName: string;
  lastName: string;
  profilePicture: string;

  constructor(
      private kbaseService: KbaseService,
      private accountService: AccountService,
      private page: Page,
      private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.getKbaseItem();
  }

  //Top actionbar
  onBarLoaded($event) {
    let bar: ActionBar = this.page.getViewById<ActionBar>("bar");
    let navigationBar = bar.nativeView;

    if (isIOS) {
      navigationBar.prefersLargeTitles = false;
    }
  }

  getKbaseItem() {
    this.kbaseService.getItem(this.articleId).subscribe((kBaseItem) => {
      this.kBaseItemId = kBaseItem.id;
      this.articleTitle = kBaseItem.title;
      this.articleContent = kBaseItem.content;
      this.date = kBaseItem.date;
      this.published = kBaseItem.published;
      this.accountId = kBaseItem.accountId;
      this.getUser(this.accountId);
    });
  }

  // Eigenaar van het artikel wordt opgehaald.
  getUser(id: string) {
    this.accountService.getUser(id).subscribe((user) => {
      this.firstName = user.firstName;
      this.middleName = user.middleName;
      this.lastName = user.lastName;
      this.profilePicture = this.kbaseService.apiLocation + "/" + user.image.url;
    });
  }

}
