import { Injectable } from "@angular/core";
import * as jwt_decode from "jwt-decode";
import { AccountService } from "~/app/services/account.service";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { catchError } from "rxjs/operators";
import { throwError } from "rxjs";
import { environment } from "~/environments/environment.tns";
import { Account } from "../models/Account.model";
import { AuthenticationService } from "~/app/services/authentication.service";

@Injectable({
  providedIn: "root"
})
export class JwtService {

  appSettings = require("tns-core-modules/application-settings");

  constructor(private accountService: AccountService, private http: HttpClient, private authService: AuthenticationService) {
    }

  checkForJWT() {
        if (this.appSettings.hasKey("JWTToken")) {
            this.updateUserFromJWT();
        }
  }

  setNewJWT(token: string) {
    this.appSettings.setString("JWTToken", token);
    this.updateUserFromJWT();
  }

  updateUserFromJWT() {
        const token = this.appSettings.getString("JWTToken");
        this.http.get(environment.apiUrl + "/api/auth/jwt/validate/" + token, {
            headers: new HttpHeaders().append("auth", "false")
        }).pipe(catchError((error) => {
            return this.handleAuthError(error)
        })).subscribe((account: { account: Account }) => {
            this.accountService.setUser(account.account);
       });

    }

  removeJWTToken() {
        this.appSettings.remove("JWTToken");
  }

  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch (Error) {
      return null;
    }
  }

  setAutoLogout() {
    // code to make user automatically logout when jwt is expired
  }

  getToken(): string {
      return this.appSettings.getString("JWTToken");
  }

  private handleAuthError(error: HttpErrorResponse) {
        console.log(error);
        this.authService.logout();
        return throwError("jwt token not validated");
    }
}
