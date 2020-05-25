import { Injectable } from "@angular/core";
import { HttpService } from "~/app/services/http.service";
import { Observable } from "rxjs";
import { NewsItem } from "~/app/models/NewsItem.model";
import { HttpClient } from "@angular/common/http";
import { Event } from "~/app/shared/models/event.model";
import { EventResponse } from "~/app/shared/models/event-response.model";
import { map } from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})
export class NewsService {

    private endpoint = "/newsposts"

    constructor(private http: HttpService) {}

    getItems(): Observable<NewsItem[]> {
        return this.http.getData(this.endpoint);
    }

    // getItem(id: number): Observable<NewsItem> {
    //     return this.http.get<NewsItem>("https://localhost:5001/api/newsposts" + id);
    // }

}
