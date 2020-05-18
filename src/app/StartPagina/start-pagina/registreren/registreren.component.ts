import { Component, OnInit } from '@angular/core';
import { Page } from '@nativescript/core/ui/page/page';

@Component({
  selector: 'ns-registreren',
  templateUrl: './registreren.component.html',
  styleUrls: ['./registreren.component.css']
})
export class RegistrerenComponent implements OnInit {

  constructor(private page: Page) {
    page.actionBarHidden = true;
  }

  ngOnInit(): void {

  }

}
