 import { AccountService } from "./account.service";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Account } from "../models/Account.model";

// class to help with routing that needs to be done automaticly
@Injectable({
    providedIn: "root"
})
export class AutoRoutingService {
    constructor(private accountService: AccountService, private http: HttpClient) {
        this.accountService.account$.subscribe((account: Account) => {
            if (account == null) {
            } else {
            }
        });
    }
}
