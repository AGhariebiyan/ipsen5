import { Injectable } from '@angular/core';
import {HttpService} from "~/app/services/http.service";
import {User} from "~/app/models/user";
import {Name} from "~/app/models/name";
import {Observable} from "rxjs";
import {genSaltSync, hashSync} from "bcryptjs"
import has = Reflect.has;
import {HttpHeaders} from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class AccountService {
  user: User;

  updateObservable;

  user$ = new Observable<User>((observer) => {
    observer.next(this.user);
    this.updateObservable = function (newValue: User) {
      this.user = newValue
      observer.next(newValue);
    };
  });

  constructor() {

  }

  subscriptionUser():Observable<User>{
    return this.user$;
  }

  checkLoginResponse(response: any):boolean{
    return response.correct;
  }

    setUser(user: any) {
    const newUser = new User(
        user.email,
        user.role,
        new Name(user.firstName, user.middleName, user.lastName));
    this.updateObservable(newUser);
  }

  resetUser() {
    this.user = null;
    this.updateObservable(null);
  }
}
