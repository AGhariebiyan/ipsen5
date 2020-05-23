import { Injectable } from "@angular/core";
import { HttpService } from "~/app/services/http.service";
import { Observable } from "rxjs";
import { NewsItem } from "~/app/models/NewsItem.model";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class NewsService {
    constructor(private http: HttpService) {}

    getItems(): Observable<NewsItem[]> {
        return this.http.getData("http://localhost:5001/api/newsposts");
    }

    // getItem(id: number): Observable<NewsItem> {
    //     return this.http.get<NewsItem>("https://localhost:5001/api/newsposts" + id);
    // }

}
