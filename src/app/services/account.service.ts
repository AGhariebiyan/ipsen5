import { Injectable } from "@angular/core";
import {genSaltSync, hashSync} from "bcryptjs"
import has = Reflect.has;
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Account } from "../models/Account.model";
import { environment } from "~/environments/environment.tns";
import { catchError, map, tap } from "rxjs/internal/operators";
import { NewsItem } from "~/app/models/NewsItem.model";
import { HttpService } from "~/app/services/http.service";
import { RouterExtensions } from "@nativescript/angular/router/router.module";
import { WorksAt } from "~/app/models/WorksAt.model";

@Injectable({
  providedIn: "root"
})
export class AccountService {

  endpoint = "/accounts/"

  account: Account;
  account$ = new Subject<Account>();

  // account$ = new Observable<Account>((observer) => {
  //   observer.next(this.account);
  //   this.updateObservable =  function(newValue: Account) {
  //     this.account = newValue;
  //     observer.next(newValue);
  //     console.log("updated account value");
  //   };
  // });


  constructor(private httpService: HttpService, private router: RouterExtensions) {
  }

  updateObservable(account: Account) {
    this.account = account;
    this.account$.next(this.account);
  }

  subscriptionUser(): Observable<Account> {
    return this.account$;
  }

  checkLoginResponse(response: any): boolean {
    return response.correct;
  }

  updateBio(bio: string): Observable<Account> {
    if (!this.account) {
      return null;
    }
    this.account.description = bio;

    return this.updateAccount();
  }

  updateName(firstName: string, lastName: string, middleName: string): Observable<Account> {
    if (!this.account) {
      return null;
    }
    this.account.firstName = firstName;
    this.account.lastName = lastName;
    this.account.middleName = middleName ? middleName : "";

    return this.updateAccount();
  }

  updateEmail(email: string) {
    if (!this.account) {
      return null;
    }
    this.account.email = email;

    return this.updateAccount();
  }

  updatePassword(password: string) {
    // Todo fill in
  }

  setUser(account: Account) {
    this.updateObservable(account);
  }

  resetUser() {
    this.setUser(null);
    this.router.navigate(["start"], {clearHistory: true});
  }

  getUser(id: string): Observable<Account> {
    // console.log("/api/accounts/" + id);
    return this.httpService.getDataWithArgs(this.endpoint, id);
  }

  removeJobFromList(companyId: string) {
    if (companyId === null) {
      return;
    }
    const jobs: WorksAt[] = this.account.jobs.filter(j => j.company.id !== companyId);
    this.account.jobs = jobs;
    this.setUser(this.account);
  }

  getAllAccounts(): Observable<Account[]> {
    return this.httpService.getData<Account[]>(this.endpoint);
  }

  private updateAccount(): Observable<Account> {
    return this.httpService.putData<Account>(this.endpoint + this.account.id, this.account, this.httpService.jsonHeader).pipe(
        tap(() => {
          this.updateObservable(this.account);
        })
    );
  }
}
