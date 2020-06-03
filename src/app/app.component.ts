import { Component, OnInit } from "@angular/core";
import {Page} from "@nativescript/core/ui/page";
import { JwtService } from "./services/jwt.service";
import { AccountService } from "./services/account.service";
import { Router } from "@angular/router";
import { filter, take, takeUntil, takeWhile } from "rxjs/internal/operators";

@Component({
    selector: "ns-app",
    templateUrl: "app.component.html"
})
export class AppComponent implements OnInit {

    loggedIn = false;
    //appSettings = require("tns-core-modules/application-settings");

    constructor(private page: Page, private jwtService: JwtService, private account: AccountService, private router: Router) {
        this.page.actionBarHidden = true;
    }

    ngOnInit(): void {

        this.account.account$.pipe(
            filter((account) => {
                return !!account;
            }),
            take(1))
            .subscribe((account) => {
            this.loggedIn = !!account;
            if (this.loggedIn) {
                this.router.navigateByUrl("/loggedin/default").catch(() => {
                    console.log("Could not navigate");
                });
            }
        });
        // Init your component properties here.
        // setting of the app can be placed here, but needs to be a service

        this.jwtService.checkForJWT();

    }
}
