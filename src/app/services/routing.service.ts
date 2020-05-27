import { AccountService } from "./account.service";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { Injectable } from "@angular/core";
import { Account } from "../models/Account.model";

// class to help with routing that needs to be done automaticly 
@Injectable({
    providedIn: 'root'
})
export class routing{
    constructor(private accountService: AccountService, private http: HttpClient, private router: Router) {
        console.log("setting subscribtion user")
        this.accountService.account$.subscribe((account: Account) => {
            if (account == null) {
                //this.router.navigateByUrl('/start');
                console.log("not logged in!")
            }
            else {
                console.log("going to logged in page")
                this.router.navigateByUrl("/loggedIn")
            }
        });
    }
}