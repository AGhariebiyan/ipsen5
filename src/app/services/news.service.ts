import { Injectable } from "@angular/core";
import { HttpService } from "~/app/services/http.service";
import { Observable } from "rxjs";
import { NewsItem } from "~/app/models/NewsItem.model";
import { HttpHeaders } from "@angular/common/http";
import { map } from "rxjs/operators";
import { environment } from "~/environments/environment.tns";

@Injectable({
    providedIn: "root"
})
export class NewsService {
    apiLocation = environment.apiUrl;

    private endpoint = "/news";
    private endpointItem = "/news/";

    constructor(private http: HttpService) {}

    getItems(): Observable<NewsItem[]> {
        return this.http.getData(this.endpoint);
    }
    
    getFeaturedItems(featured: boolean): Observable<NewsItem[]> {
        const allNews = this.getItems();

        return allNews.pipe(map((result) => {
            return result.filter((newsItem) => newsItem.featured === featured);

        }));
        
    }

    getItemsByUser(id: string): Observable<NewsItem[]> {
        const allNews = this.getItems();
        return allNews.pipe(map((result) => {
            return result.filter((newsItem) => newsItem.accountId == id);

        }));
    }

    getItem(id: string): Observable<NewsItem> {
        return this.http.getDataWithArgs(this.endpointItem, id);
    }

    makePostRequest(body: any) {

        const headers = new HttpHeaders({
            "Content-Type": "application/json"
        });

        return this.http.postData(this.endpoint, body, headers).subscribe();
    }

    makePutRequest(id: string, body: any) {
        const headers = new HttpHeaders({
            "Content-Type": "application/json"
        });

        return this.http.putData(this.endpointItem + id, body, headers).subscribe();
    }

    deleteNewspost(id: string) {
        return this.http.deleteData(this.endpointItem + id).subscribe();

    }
}
