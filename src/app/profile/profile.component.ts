import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { RouterExtensions } from "nativescript-angular";
import { Event } from "~/app/models/event.model";
import { AccountService } from "~/app/services/account.service";
import { Account } from "~/app/models/Account.model";
import { environment } from "~/environments/environment.tns";
import { AuthenticationService } from "~/app/services/authentication.service";

export interface ClickItem {
  icon: string;
  text: string;
  onClick: () => any;
}

@Component({
  selector: "ns-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"]
})
export class ProfileComponent implements OnInit {

  account: Account;
  baseUrl = environment.apiUrl + "/";
  placeholder = "https://randomuser.me/api/portraits/men/78.jpg";

  constructor(private routerExtensions: RouterExtensions,
              private accountService: AccountService,
              private authService: AuthenticationService) {

  }

  ngOnInit(): void {
    this.account = this.accountService.account;
  }

  goBack() {
    this.routerExtensions.back();
  }

  logout() {
    this.authService.logout();
  }
}
