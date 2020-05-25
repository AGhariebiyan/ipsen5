import { Injectable } from '@angular/core';
import * as jwt_decode from "jwt-decode";
import {AccountService} from "~/app/services/account.service";
import {User} from "~/app/models/user";
import {Name} from "~/app/models/name";

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  appSettings = require("tns-core-modules/application-settings");

  constructor(private accountService: AccountService) {
    // if(this.appSettings.hasKey("JWTToken")) this.updateUserFromJWT();
  }

  setNewJWT(token: string) {
    this.appSettings.setString("JWTToken", token);
    this.updateUserFromJWT()
  }

  updateUserFromJWT(){
    const token = this.appSettings.getString("JWTToken")
    const decodedToken = this.getDecodedAccessToken(token);

    console.log(decodedToken);
    this.accountService.setUser(new User(decodedToken.email, decodedToken.role, new Name(decodedToken.firstName, decodedToken.middleName, decodedToken.lastName)));
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
