import { Injectable } from "@angular/core";
import { Account } from "../models/Account.model";
import { HttpClient} from "@angular/common/http";
import { environment } from "../../environments/environment.tns";
import { HttpService } from "./http.service";
import { Observable } from "tns-core-modules/ui/page";

@Injectable({
    providedIn: "root"
})

export class UsersService {

    endpoint = "/users"

    constructor(private http: HttpService) {}

}