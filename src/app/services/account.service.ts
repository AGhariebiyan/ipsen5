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
import { PermissionRole } from "~/app/models/PermissionRole.model";

export class AccountPassword{
    constructor(
        private id: string,
        private password: string
    ) {}
}

@Injectable({
  providedIn: "root"
})
export class AccountService {

  account: Account;
  account$ = new Subject<Account>();


  constructor(private http: HttpClient, private httpService: HttpService, private router: RouterExtensions) {
  }

  updateObservable(account: Account) {
    this.account = account;
    this.account$.next(this.account);
  }

  getAllAccounts(): Observable<Account[]> {
    return this.httpService.getData<Account[]>("/accounts/");
  }

  hasRole(roles: string[]) {
    if (this.account === null) {
      return false;
    }
    for (const role of roles) {
      if (this.account.role.internalName === role) {
        return true;
      }
    }

    return false;
  }

  subscriptionUser(): Observable<Account> {
    return this.account$;
    }

    deleteAccount(id: string): Observable<any> {

        return this.httpService.deleteData<Account>("/accounts/" + id);
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

    updatePassword(password: string): Observable<Account> {
      if (!this.account) {
          return null;
      }
        return this.http.put<Account>(environment.apiUrl + "/api/accounts/" + this.account.id + "/password",
            new AccountPassword(this.account.id, password)
        );
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

    return this.httpService.getDataWithArgs("/accounts/", id);
    }

    getAllUsersAdmin(): Observable<Account[]> {
        return this.httpService.getData("/accounts/admin");
    }

  removeJobFromList(companyId: string) {
    if (companyId === null) {
      return;
    }
    const jobs: WorksAt[] = this.account.jobs.filter(j => j.company.id !== companyId);
    this.account.jobs = jobs;
    this.setUser(this.account);
  }

  setUserRole(id: string, roleId: string) {
    return this.http.put(environment.apiUrl + "/api/accounts/" + id + "/roles/" + roleId, {});
  }

  getRoleOptions() {
    return this.http.get<PermissionRole[]>(environment.apiUrl + "/api/accounts/roles");
  }

  private updateAccount(): Observable<Account> {
    return this.http.put<Account>(environment.apiUrl + "/api/accounts/" + this.account.id, this.account).pipe(
        tap(() => {
          this.updateObservable(this.account);
        })
    );
  }
}
