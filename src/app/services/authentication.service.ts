import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { HttpService } from "~/app/services/http.service";
import { AccountService } from "~/app/services/account.service";
import { catchError } from "rxjs/operators";
import { throwError } from "rxjs";
import { JwtService } from "~/app/services/jwt.service";
import { environment } from "~/environments/environment.tns";

@Injectable({
  providedIn: "root"
})
export class AuthenticationService {

  constructor(private http: HttpClient,
              private accountService: AccountService,
              private jwtService: JwtService) { }

  login(email: string, password: string) {
    this.http.post(environment.apiUrl + "/api/auth/login",
        {email, password},
        {
          headers: new HttpHeaders().append("auth", "false")
        }).pipe(
            catchError(this.handleLoginError)
        ).subscribe((item) => {
          this.logInUser(item);
        });

  }

  validateJWT() {
    // request to back-end to validate token
  }

  logout() {
    this.accountService.resetUser();
  }

  logInUser(item: any) {
    this.jwtService.setNewJWT(item.token);

    // testing
    // this.jwtService.setNewJWT(item);
  }

  private handleLoginError(error: HttpErrorResponse) {

    console.log(error);

    const dialogs = require("tns-core-modules/ui/dialogs");

    if (error.error instanceof HttpErrorResponse) {
      if (error.error.message === "Unauthorized") {
      dialogs.alert({
        title: "E-mail or password incorrect",
        message: "Please try again",
        okButtonText: "Close"
      });
      } else { dialogs.alert({
        title: "Something went wrong",
        message: "Please try again",
        okButtonText: "Close"
      });
      }
    } else {
        if (error.status == 401) {
            console.log(error);
            if (error.error == "email not verified") 
                dialogs.alert({
                    title: "E-mail is nog niet geverifierd",
                    message: "Als u nog geen e-mail heeft gehad of als deze verlopen is vraag dan opnieuw aan.",
                    okButtonText: "Close"
                });
            else
        dialogs.alert({
          title: "E-mail or password incorrect",
          message: "Please try again",
          okButtonText: "Close"
        });
      } else { dialogs.alert({
        title: "Something went wrong",
        message: "Please try again",
        okButtonText: "Close"
      });
      }
    }

    return throwError("Something bad happened; please try again later");
  }
}
