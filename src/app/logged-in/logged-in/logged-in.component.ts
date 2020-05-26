import { Component, OnInit } from "@angular/core";
import { Page } from "@nativescript/core/ui/page";
import { RouterExtensions } from "nativescript-angular/router";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "ns-logged-in",
  templateUrl: "./logged-in.component.html",
  styleUrls: ["./logged-in.component.css"]
})

export class LoggedInComponent implements OnInit {

  constructor(private page: Page, private routerExtension: RouterExtensions, private activactedRoute: ActivatedRoute) {
    page.actionBarHidden = true;
  }

  ngOnInit(): void {
    this.routerExtension.navigate(
      [
        {
          outlets: {
            newsTab: ["news"],
            eventsTab: ["events"],
            kbaseTab: ["kbase"],
            searchTab: ["search"]
          }
        }
      ],
      {
        relativeTo: this.activactedRoute
      }
    );
  }

}
