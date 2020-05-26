import { Injectable } from '@angular/core';
import * as jwt_decode from "jwt-decode";
import { AccountService } from "~/app/services/account.service";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import {User} from "~/app/models/user";
import {Name} from "~/app/models/name";
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { environment } from "~/environments/environment.tns";

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  appSettings = require("tns-core-modules/application-settings");

  constructor(private accountService: AccountService, private http: HttpClient) {
    }

    checkForJWT() {
        if (this.appSettings.hasKey("JWTToken")) this.updateUserFromJWT();
    }

  setNewJWT(token: string) {
    this.appSettings.setString("JWTToken", token);
    this.updateUserFromJWT()
  }

    updateUserFromJWT() {
        const token = this.appSettings.getString("JWTToken")
        this.http.get(environment.apiUrl + "/api/auth/jwt/validate/" + token, {
            headers: new HttpHeaders().append("auth", "false")
        }).pipe(
        catchError(this.handleAuthError)
    ).subscribe(() => {
        const decodedToken = this.getDecodedAccessToken(token);
        this.accountService.setUser(new User(decodedToken.email, decodedToken.role, new Name(decodedToken.firstName, decodedToken.middleName, decodedToken.lastName)));
    });

    }

    private handleAuthError(error: HttpErrorResponse) {
        return throwError("jwt token not validated");
    }

    removeJWTToken() {
        this.appSettings.remove("JWTToken");
    }

  getDecodedAccessToken(token: string): any {
    try{
      return jwt_decode(token);
    }
    catch(Error){
      return null;
    }
  }

  setAutoLogout(){
    // code to make user automatically logout when jwt is expired
  }
}
