import { Component, OnInit, Input } from '@angular/core';
import * as frameModule from "tns-core-modules/ui/frame";
import { isIOS } from 'tns-core-modules/platform';
import { Page } from 'tns-core-modules/ui/page';
import { ActionBar } from 'tns-core-modules/ui/action-bar/action-bar';

@Component({
  selector: 'ns-custom-action-bar',
  templateUrl: './custom-action-bar.component.html'
})
export class CustomActionBarComponent implements OnInit {
  @Input() titleText: string

  constructor(private page: Page) { }

  ngOnInit(): void {

  }

  onBarLoaded($event) {
    let bar: ActionBar = this.page.getViewById<ActionBar>("bar");
    let navigationBar = bar.nativeView;

    if (isIOS) {
      navigationBar.prefersLargeTitles = true;
    }
  }

}
