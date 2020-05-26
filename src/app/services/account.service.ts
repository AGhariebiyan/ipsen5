import { Injectable } from "@angular/core";
import { HttpService } from "~/app/services/http.service";
import { User } from "~/app/models/user";
import { Name } from "~/app/models/name";
import { BehaviorSubject, Observable } from "rxjs";
import { genSaltSync, hashSync } from "bcryptjs";
import has = Reflect.has;
import { HttpHeaders } from "@angular/common/http";
import { RouterExtensions } from "nativescript-angular/router";
@Injectable({
  providedIn: "root"
})
export class AccountService {
  user: User;

  user$ = new BehaviorSubject<User>(this.user);

  // //user$: Observable<User> = new Observable<User>(this.user);
  //
  //
  // //ser$ = new Observable<User>((observer) => {
  //   observer.next(this.user);
  //   this.updateObservable = (newValue: User) => {
  //     this.user = newValue;
  //     observer.next(newValue);
  //   };
  // });

  // tslint:disable-next-line:no-empty
  constructor(private router: RouterExtensions) {

  }

  updateObservable(newValue: User) {
    this.user = newValue;
    this.user$.next(this.user);
  }

  subscriptionUser(): BehaviorSubject<User> {
    return this.user$;
  }

  checkLoginResponse(response: any): boolean {
    return response.correct;
  }

  setUser(user: any) {
    const newUser = new User(
        user.email,
        user.role,
        new Name(user.firstName, user.middleName, user.lastName));
    this.updateObservable(newUser);
    if (newUser) {
      console.log("Routing to login");
      this.router.navigate(["loggedin", "default"]).then((message) => {
        console.log("ROuted to loggedIn", message);
      }).catch((reject) => {
        console.log("Failed to route", reject);
      });
    }

  }

  resetUser() {
    this.user = null;
    this.updateObservable(null);
  }
}
