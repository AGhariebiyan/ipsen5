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
        this.accountService.account$.subscribe((account: Account) => {
            if (account == null) {
                //this.router.navigateByUrl('/start');
            }
            else {
                this.router.navigateByUrl("/loggedIn")
            }
        });
    }
}
