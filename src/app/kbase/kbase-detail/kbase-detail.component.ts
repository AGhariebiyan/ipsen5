import { Component, OnInit } from '@angular/core';
import { ActionBar } from "tns-core-modules/ui/action-bar";
import { isIOS } from "tns-core-modules/platform";
import { Page } from "tns-core-modules/ui/page";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'ns-kbase-detail',
  templateUrl: './kbase-detail.component.html',
  styleUrls: ['./kbase-detail.component.css']
})
export class KbaseDetailComponent implements OnInit {

  articleId = this.activatedRoute.snapshot.params.articleId;

  constructor(
      private page: Page,
      private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
  }

  //Top actionbar
  onBarLoaded($event) {
    let bar: ActionBar = this.page.getViewById<ActionBar>("bar");
    let navigationBar = bar.nativeView;

    if (isIOS) {
      navigationBar.prefersLargeTitles = false;
    }
  }

}
