import { Component, OnInit } from "@angular/core";
import {Page} from "@nativescript/core/ui/page";
import { JwtService } from "./services/jwt.service";
import { AccountService } from "./services/account.service";
import { Router } from "@angular/router";

@Component({
    selector: "ns-app",
    templateUrl: "app.component.html"
})
export class AppComponent implements OnInit {

    loggedIn = false;
    appSettings = require("tns-core-modules/application-settings");

    constructor(private page: Page, private jwtService: JwtService, private account: AccountService, private router: Router) {
        this.page.actionBarHidden = true;
    }

    ngOnInit(): void {

        this.account.user$.subscribe(user => {
            this.loggedIn = !!user
            if (this.loggedIn)
            this.router.navigateByUrl("/loggedIn");

        })
        // Init your component properties here.
        console.log("app component created")

        // setting of the app can be placed here, but needs to be a service
        if (this.appSettings.getBoolean("autoLogin")) {
            this.jwtService.checkForJWT();
        }
    }
}
