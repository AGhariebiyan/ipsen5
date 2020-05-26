import { Injectable } from "@angular/core";
import { environment } from "~/environments/environment.tns";
import { last } from "rxjs/internal/operators";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: "root"
})
export class RegisterService {


    constructor(private http: HttpClient) {
    }

    register(email: string, password: string, firstName: string, lastName: string, middleName: string) {
        return this.http.post(environment.apiUrl + "/api/auth/register", {
            email,
            password,
            firstName,
            lastName,
            middleName: middleName ? middleName : ""
        })

    }

}
