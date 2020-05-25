import { Injectable } from "@angular/core";
import { HttpService } from "~/app/services/http.service";
import { Observable } from "rxjs";
import { NewsItem } from "~/app/models/NewsItem.model";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Event } from "~/app/shared/models/event.model";
import { EventResponse } from "~/app/shared/models/event-response.model";
import { map } from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})
export class NewsService {

    private endpoint = "/newsposts";
    private endpointItem = "/newsposts/";

    constructor(private http: HttpService) {}

    getItems(): Observable<NewsItem[]> {
        return this.http.getData(this.endpoint);
    }

    getItem(id: string): Observable<NewsItem> {
        return this.http.getDataWithArgs(this.endpointItem, id);
    }

    makePutRequest(id: string, body: HttpParams) {
        console.log(body);

        let headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });

        return this.http.putData(this.endpointItem + id, body, headers).subscribe();
    }

}
