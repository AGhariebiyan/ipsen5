import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular";
import { Account } from "~/app/models/Account.model";
import { environment } from "~/environments/environment.tns";
import { UsersService } from "../services/users.service";
import { HttpClient, HttpResponse, HttpErrorResponse } from "@angular/common/http";
import { ActivatedRoute } from "@angular/router";
import { AccountService } from "../services/account.service";
import { KBase } from "../models/KBase.model";
import { NewsItem } from "../models/NewsItem.model";
import { KbaseService } from "../services/kbase.service";
import { NewsService } from "../services/news.service";
import { catchError } from "rxjs/operators";
import { ObservableInput } from "rxjs";

@Component({
  selector: "ns-profile",
  templateUrl: "./user-profile.component.html",
  styleUrls: ["./user-profile.component.css"]
})
export class UserProfileComponent implements OnInit {

    userAccount: Account;
    kbase: KBase;
    news: NewsItem;

    baseUrl = environment.apiUrl + "/";
    placeholder = "https://randomuser.me/api/portraits/men/78.jpg";

    private sub: any;

    constructor(
        private newsService: NewsService,
        private kbaseService: KbaseService,
        private routerExtensions: RouterExtensions,
        private route: ActivatedRoute,
        private accountService: AccountService
    ) {

  }

    ngOnInit(): void {
      this.sub = this.route.params.subscribe((params) => {
          this.accountService.getUser(params.id).subscribe((account: Account) => {
              this.userAccount = account;
              if (this.userAccount) {
                  this.setFirstKBase();
                  this.setFirstNews();
              }
          });
      });

    }

    getJobName() {
        if (this.userAccount.jobs.length === 0) {
            return "Geen bedrijf";
        } else {
            this.userAccount.jobs[0].company.name;
        }
    }

    getJobFunction() {
        if (this.userAccount.jobs.length === 0) {
            return "Geen functies";
        } else {
            this.userAccount.jobs[0].role;
        }
    }

    getFirstName() {
        return this.userAccount ? this.userAccount.firstName : "Person";
    }

    setFirstKBase() {
        this.kbaseService.getItemsByUser(this.userAccount.id)
            .pipe(catchError(this.handleError))
            .subscribe((items: KBase[]) => {
            this.kbase = items[0];
        });
    }

    setFirstNews() {
        this.newsService.getItemsByUser(this.userAccount.id)
            .pipe(catchError(this.handleError))
            .subscribe((items: NewsItem[]) => {
                this.news = items[0];
            });
    }

    goBack() {
        this.routerExtensions.back();
    }

    handleError(error: any, item: any): ObservableInput<any> {
        const dialogs = require("tns-core-modules/ui/dialogs");

        if (error.status === "404") { return; }
        dialogs.alert({
            title: "Something went wrong",
            message: "We were unable to get data from the server",
            okButtonText: "Close"
        });
    }
}
