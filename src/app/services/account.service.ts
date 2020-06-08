import { Injectable } from '@angular/core';
import {HttpService} from "~/app/services/http.service";
import {Observable} from "rxjs";
import {genSaltSync, hashSync} from "bcryptjs"
import has = Reflect.has;
import {HttpHeaders} from "@angular/common/http";
import { Account } from '../models/Account.model';
import { NewsItem } from "~/app/models/NewsItem.model";
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { environment } from "~/environments/environment.tns";
import { catchError, map, tap } from "rxjs/internal/operators";

@Injectable({
  providedIn: "root"
})
export class AccountService {
  private endpoint = "/accounts";

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

  constructor(private httpClient: HttpClient, private http: HttpService) {

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
    console.log("account service");
    console.log(this.http.getDataWithArgs(this.endpoint + "/", id));
    return this.http.getDataWithArgs(this.endpoint + "/", id);
  }

  private updateAccount(): Observable<Account> {
    return this.httpClient.put<Account>(environment.apiUrl + "/api/accounts/" + this.account.id, this.account).pipe(
      tap(() => {
        this.updateObservable(this.account);
      })
    );
  }
}
