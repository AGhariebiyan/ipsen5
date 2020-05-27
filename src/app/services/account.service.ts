import { Injectable } from '@angular/core';
import {HttpService} from "~/app/services/http.service";
import {Observable} from "rxjs";
import {genSaltSync, hashSync} from "bcryptjs"
import has = Reflect.has;
import {HttpHeaders} from "@angular/common/http";
import { Account } from '../models/Account.model';


@Injectable({
  providedIn: 'root'
})
export class AccountService {
  account: Account;

  updateObservable;

  account$ = new Observable<Account>((observer) => {
    observer.next(this.account);
    this.updateObservable = function (newValue: Account) {
      this.account = newValue
      observer.next(newValue);
    };
  });

  constructor() {

  }

  subscriptionUser():Observable<Account>{
    return this.account$;
  }

  checkLoginResponse(response: any):boolean{
    return response.correct;
  }

    setUser(account: Account) {
    this.updateObservable(account);
  }

  resetUser() {
    this.account = null;
    this.updateObservable(null);
  }
}
