import { Component, OnInit } from '@angular/core';
import {Page} from "@nativescript/core/ui/page";
import {AccountService} from "~/app/services/account.service";
import {AuthenticationService} from "~/app/services/authentication.service";

@Component({
  selector: 'ns-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string = "Yorandevos12@gmail.com";
  password: string = "12345678";

  constructor(private page: Page, private authService: AuthenticationService) {
    page.actionBarHidden = true;
  }

  ngOnInit(): void {
  }

  login() {
    if (this.isValidEmail(this.email)) this.authService.login(this.email, this.password);
    else{
      const dialogs = require("tns-core-modules/ui/dialogs");
      dialogs.alert({
        title: "Not a valid E-mail",
        message: "Please give a valid email adress",
        okButtonText: "Close"
      });
    }
  }

  isValidEmail(email: string) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return re.test(email);
  }
}
