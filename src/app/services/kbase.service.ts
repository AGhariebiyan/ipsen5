import { Injectable } from "@angular/core";
import { HttpService } from "~/app/services/http.service";
import { Observable } from "rxjs";
import { NewsItem } from "~/app/models/NewsItem.model";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Event } from "~/app/models/event.model";
import { EventResponse } from "~/app/models/event-response.model";
import { map } from "rxjs/operators";
import { KBase } from "~/app/models/KBase.model";
import { environment } from "~/environments/environment.tns";

@Injectable({
    providedIn: 'root'
})
export class KbaseService {
    apiLocation = environment.apiUrl;

    private endpoint = "/articles";
    private endpointItem = "/articles/";

    constructor(private http: HttpService) {}

    getItems(): Observable<KBase[]> {
        return this.http.getData(this.endpoint);
    }

    getFeaturedItems(): Observable<KBase[]> {
        const allNews = this.getItems();

        return allNews.pipe(map((result) => {
            return result.filter((kbase) => kbase.published === true);

        }));
    }

    getSearchedItems(query: string): Observable<KBase[]> {
        const allNews = this.getItems();

        return allNews.pipe(map((result) => {
            return result.filter((kbase) => kbase.title === query);

        }));
    }

    getItem(id: string): Observable<KBase> {
        return this.http.getDataWithArgs(this.endpointItem, id);
    }

    getItemsByUser(id: string): Observable<KBase[]> {
        return this.http.getDataWithArgs(this.endpointItem + "user/", id);
    }

    makePostRequest(body: any) {

        let headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });

        return this.http.postData(this.endpoint, body, headers).subscribe();
    }

    makePutRequest(id: string, body: any) {
        let headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });

        return this.http.putData(this.endpointItem + id, body, headers).subscribe();
    }

    deleteArticle(id: string) {
        return this.http.deleteData(this.endpointItem + id).subscribe();

    }
}
