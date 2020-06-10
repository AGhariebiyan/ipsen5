import { Component, OnInit } from '@angular/core';
import { RouterExtensions } from "nativescript-angular";

@Component({
  selector: 'ns-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.css']
})
export class UserDataComponent implements OnInit {

  constructor(private routerExtensions: RouterExtensions) { }

  ngOnInit(): void {
  }

  goBack() {
    this.routerExtensions.back();
  }

}
