import { Component, OnInit } from "@angular/core";
import {Page} from "@nativescript/core/ui/page";
import { RouterExtensions } from "nativescript-angular/router";
import { Router } from "@angular/router";

@Component({
    selector: "ns-app",
    templateUrl: "app.component.html"
})
export class AppComponent implements OnInit {

    loggedIn = false;

    constructor(private page: Page, private router: Router) {
        this.page.actionBarHidden = true;
    }

    ngOnInit(): void {
        // Init your component properties here.
        console.log("app component created");
        this.router.events.subscribe((event) => {
            console.log(event);
        });
    }
}
