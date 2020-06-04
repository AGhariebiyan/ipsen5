import { Component, OnInit } from '@angular/core';
import { ActionBar } from "tns-core-modules/ui/action-bar";
import { isIOS } from "tns-core-modules/platform";
import { Page } from "tns-core-modules/ui/page";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { confirm, default as dialogs } from "tns-core-modules/ui/dialogs";
import { NewsItem } from "~/app/models/NewsItem.model";
import { AccountService } from "~/app/services/account.service";
import { RouterExtensions } from "nativescript-angular/router";
import { KbaseService } from "~/app/services/kbase.service";
import { KBase } from "~/app/models/KBase.model";

@Component({
  selector: 'ns-kbase-add',
  templateUrl: './kbase-add.component.html',
  styleUrls: ['./kbase-add.component.css']
})
export class KbaseAddComponent implements OnInit {
  form: FormGroup;
  articleTitle = "";
  articleDescription = "";

  constructor(
      private page: Page,
      private accountService: AccountService,
      private routerExtensions: RouterExtensions,
      private kbaseService: KbaseService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      articleTitle: new FormControl(null, { updateOn: 'change', validators: [Validators.required]}),
      articleDescription: new FormControl(null, { updateOn: 'change', validators: [Validators.required]})
    });
  }

  onBarLoaded($event) {
    let bar: ActionBar = this.page.getViewById<ActionBar>("bar");
    let navigationBar = bar.nativeView;

    if (isIOS) {
      navigationBar.prefersLargeTitles = false;
    }
  }

  displayConfirmDialogSave() {
    const options = {
      title: "Weet u zeker dat u het nieuwsbericht wilt wijzigen?",
      okButtonText: "Opslaan",
      cancelButtonText: "Annuleer"
    };
    confirm(options).then((result: boolean) => {
      const articleTitle = this.form.get('articleTitle').value;
      const articleDescription = this.form.get('articleDescription').value;

      if (result === true && articleTitle !== "" && articleDescription !== "") {
        this.onSubmit();
        this.routerExtensions.back();
      } else {
        dialogs.alert({
          title: "vul alle invoervelden in",
          okButtonText: "Oke"
        }).then(() => {
          console.log("Dialog closed!");
        });
      }
    });
  }

  onSubmit() {
    const articleTitle = this.form.get('articleTitle').value;
    const articleDescription = this.form.get('articleDescription').value;

    const articleItem = new KBase(articleTitle, articleDescription, new Date(),
        true, this.accountService.account.id);

    const body = JSON.stringify(articleItem);

    this.kbaseService.makePostRequest(body);
  }

}
