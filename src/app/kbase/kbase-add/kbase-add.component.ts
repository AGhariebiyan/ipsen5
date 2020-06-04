import { Component, OnInit } from '@angular/core';
import { ActionBar } from "tns-core-modules/ui/action-bar";
import { isIOS } from "tns-core-modules/platform";
import { Page } from "tns-core-modules/ui/page";
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'ns-kbase-add',
  templateUrl: './kbase-add.component.html',
  styleUrls: ['./kbase-add.component.css']
})
export class KbaseAddComponent implements OnInit {
  form: FormGroup;

  constructor(private page: Page) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      newsTitle: new FormControl(null, { updateOn: 'change', validators: [Validators.required]}),
      newsDescription: new FormControl(null, { updateOn: 'change', validators: [Validators.required]})
    });
  }

  onBarLoaded($event) {
    let bar: ActionBar = this.page.getViewById<ActionBar>("bar");
    let navigationBar = bar.nativeView;

    if (isIOS) {
      navigationBar.prefersLargeTitles = false;
    }
  }

}
