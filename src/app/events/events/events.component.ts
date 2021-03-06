import { Component, OnInit } from '@angular/core';
import { isIOS } from 'tns-core-modules/platform';
import { ActionBar } from 'tns-core-modules/ui/action-bar/action-bar';
import { Page } from 'tns-core-modules/ui/page';
import { RouterExtensions } from "nativescript-angular";

@Component({
  selector: 'ns-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css'],
  moduleId: module.id
})
export class EventsComponent implements OnInit {

  constructor(private page: Page, private router: RouterExtensions) { }

  ngOnInit(): void {
    this.page.actionBarHidden = true;
  }

}
