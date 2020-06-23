import { Injectable } from "@angular/core";
import { Account } from "../models/Account.model";
import { HttpClient} from "@angular/common/http";
import { environment } from "../../environments/environment.tns";

@Injectable({
    providedIn: "root"
})

export class UsersService {

    constructor(private http: HttpClient) {

    }

}