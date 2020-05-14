import { Component, OnInit } from '@angular/core';
import {Page} from "@nativescript/core/ui/page";

@Component({
  selector: 'ns-logged-in',
  templateUrl: './logged-in.component.html',
  styleUrls: ['./logged-in.component.css']
})
export class LoggedInComponent implements OnInit {

  constructor(private page: Page) {
    page.actionBarHidden = true;
  }

  ngOnInit(): void {

  }

}
