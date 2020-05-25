import { NativeScriptHttpClientModule } from "nativescript-angular/http-client";
import { HttpClient } from "@angular/common/http";
import { Event } from "~/app/shared/models/event.model";

class EventService {

    constructor(private http: HttpClient) {
    }

}
