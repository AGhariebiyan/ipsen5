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

    private endpoint = "/news";
    private endpointItem = "/news/";

    constructor(private http: HttpService) {}

    getItems(): Observable<NewsItem[]> {
        return this.http.getData(this.endpoint);
    }

    getItem(id: string): Observable<NewsItem> {
        return this.http.getDataWithArgs(this.endpointItem, id);
    }

    makePostRequest(body: any) {

        let headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });

        return this.http.postData(this.endpoint, body, headers).subscribe();
    }

    makePutRequest(id: string, body: any) {
        console.log(body);

        let headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });

        return this.http.putData(this.endpointItem + id, body, headers).subscribe();
    }

    deleteNewspost(id: string) {
        console.log(this.endpointItem + id);

        return this.http.deleteData(this.endpointItem + id).subscribe();
    }

}
