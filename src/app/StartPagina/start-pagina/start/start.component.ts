import { Component, OnInit } from '@angular/core';
import { Page, Color } from '@nativescript/core/ui/page/page';
import { GestureEventData } from '@nativescript/core/ui/gestures/gestures';

@Component({
  selector: 'ns-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {

  constructor(private page: Page) {
    page.actionBarHidden = true;
  }

  ngOnInit(): void {
  }

  tapRegister(args: GestureEventData) {
  }
}
