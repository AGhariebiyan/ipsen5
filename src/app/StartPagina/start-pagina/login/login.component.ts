import { Component, OnInit } from '@angular/core';
import {Page} from "@nativescript/core/ui/page";
import {AccountService} from "~/app/services/account.service";

@Component({
  selector: 'ns-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;

  constructor(private page: Page, private accountService: AccountService) {
    page.actionBarHidden = true;
  }

  ngOnInit(): void {
  }

  login(){
    if(this.isValidEmail(this.email)) this.accountService.login(this.email, this.password);
    else{
      var dialogs = require("tns-core-modules/ui/dialogs");
      dialogs.alert({
        title: "Not a valid E-mail",
        message: "Please give a valid email adress",
        okButtonText: "Close"
      });
    }
  }

  isValidEmail(email: string) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }
}
