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

  constructor(private httpService: HttpService) {

  }

  login(email: string, password: string){
    this.httpService.postData("https://192.168.1.140:5000/api/auth/login", JSON.stringify({email: email, password: password}), new HttpHeaders().append("auth", "false"))
        .subscribe(item => {
          this.setUser(item);
          console.log(item)
          // else{
          //   var dialogs = require("tns-core-modules/ui/dialogs");
          //   dialogs.alert({
          //     title: "E-mail or password incorrect",
          //     message: "Please try again",
          //     okButtonText: "Close"
          //   });
          // }
        });


    var dialogs = require("tns-core-modules/ui/dialogs");
    dialogs.alert({
      title: "E-mail or password incorrect",
      message: "Please try again",
      okButtonText: "Close"
    });
    // this.setUser({email: email, role: "role", firstName: "first", middleName: "middle", lastName: "last"})
  }

  logout(){
    this.user = null;
    this.updateObservable(null);
  }

  subscriptionUser():Observable<User>{
    return this.user$;
  }

  checkLoginResponse(response: any):boolean{
    return response.correct;
  }

  setUser(user: any){
    const newUser = new User(
        user.email,
        user.role,
        new Name(user.firstName, user.middleName, user.lastName));
    this.updateObservable(newUser);
  }
}
