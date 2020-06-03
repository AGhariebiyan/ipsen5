import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Account } from "../models/Account.model";
import { environment } from "~/environments/environment.tns";

@Injectable({
  providedIn: "root"
})
export class AccountService {
  account: Account;

  updateObservable;

  account$ = new Observable<Account>((observer) => {
    observer.next(this.account);
    this.updateObservable =  function(newValue: Account) {
      this.account = newValue;
      observer.next(newValue);
      console.log("updated account value");
    };
  });

  constructor(private http: HttpClient) {

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

  updateEmail(email: string){
    if(!this.account){
      return null;
    }
    this.account.email = email;
    this.updateAccount();
  }

  updatePassword(password: string){
    // Todo fill in
  }

  setUser(account: Account) {
        this.updateObservable(account);
  }

  resetUser() {
    this.account = null;
    this.updateObservable(null);
  }

  private updateAccount(): Observable<Account> {
    return this.http.put<Account>(environment.apiUrl + "/api/accounts/" + this.account.id, this.account);
  }
}
