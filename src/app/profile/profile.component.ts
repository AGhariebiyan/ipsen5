import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular";
import { Event } from "~/app/shared/models/event.model";

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

  constructor(private routerExtensions: RouterExtensions) { }

  ngOnInit(): void {
  }

  goBack() {
    this.routerExtensions.back();
  }
}
