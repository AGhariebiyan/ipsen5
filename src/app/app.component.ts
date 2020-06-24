import { Component, OnInit } from "@angular/core";
import { Page } from "@nativescript/core/ui/page";
import { JwtService } from "./services/jwt.service";
import { AccountService } from "./services/account.service";
import { RouterExtensions } from "@nativescript/angular/router/router.module";

@Component({
    selector: "ns-app",
    templateUrl: "app.component.html"
})
export class AppComponent implements OnInit {

    loggedIn = false;
    wasLoggedIn = false;
    constructor(private page: Page,
                private jwtService: JwtService,
                private account: AccountService,
                private router: RouterExtensions) {
        this.page.actionBarHidden = true;
    }

    ngOnInit(): void {
        this.account.account$.subscribe((account) => {
            this.loggedIn = account != null;

            if (this.loggedIn && !this.wasLoggedIn) {
                this.wasLoggedIn = true;
                this.router.navigate(["loggedin", "default"], {clearHistory: true}).then((success) => {
                }).catch(() => {
                    console.log("Could  not navigate");
                });
            } else if (!this.loggedIn && this.wasLoggedIn) {
                this.wasLoggedIn = false;
                this.router.navigate(["start"]);
                return;
            }
        });

        // Init your component properties here.
        // setting of the app can be placed here, but needs to be a service

        this.jwtService.checkForJWT();

    }
}
