import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular";
import { Account } from "~/app/models/Account.model";
import { environment } from "~/environments/environment.tns";
import { UsersService } from "../services/users.service";
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: "ns-profile",
  templateUrl: "./user-profile.component.html",
  styleUrls: ["./user-profile.component.css"]
})
export class UserProfileComponent implements OnInit {

    userAccount: Account;
    private sub: any;
  baseUrl = environment.apiUrl + "/";
    placeholder = "https://randomuser.me/api/portraits/men/78.jpg";


    

    constructor(private routerExtensions: RouterExtensions, private route: ActivatedRoute,
        private usersService: UsersService, private http: HttpClient) {

  }

  ngOnInit(): void {
      this.sub = this.route.params.subscribe(params => {
          this.http.get(environment.apiUrl + "/api/Accounts/" + params["id"]).pipe().subscribe((account: Account) => {
              this.userAccount = account;
          });
      })
  }

    goBack() {
        this.routerExtensions.back();
  }
}
