import { Component, OnInit } from "@angular/core";
import {Page} from "@nativescript/core/ui/page";

@Component({
    selector: "ns-app",
    templateUrl: "app.component.html"
})
export class AppComponent implements OnInit {

    loggedIn = false;

    constructor(private page: Page) {
        this.page.actionBarHidden = true;
    }

    ngOnInit(): void {
        // Init your component properties here.
        console.log("app component created")
    }
}
