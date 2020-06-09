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

@Injectable({
  providedIn: "root"
})
export class AccountService {
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


  constructor(private http: HttpClient, private httpService: HttpService) {
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
    this.account = null;
    this.updateObservable(null);
  }

  getUser(id: string): Observable<Account> {
    console.log("/api/accounts/" + id);

    return this.httpService.getDataWithArgs("/accounts/", id);
  }

  private updateAccount(): Observable<Account> {
    return this.http.put<Account>(environment.apiUrl + "/api/accounts/" + this.account.id, this.account).pipe(
        tap(() => {
          this.updateObservable(this.account);
        })
    );
  }
}
