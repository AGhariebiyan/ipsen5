import { Injectable } from "@angular/core";
import { HttpService } from "~/app/services/http.service";
import { Observable } from "rxjs";
import { NewsItem } from "~/app/models/NewsItem.model";

@Injectable({
    providedIn: 'root'
})

export class NewsService {
    newsposts: Array<NewsItem> = [];

    constructor(private http: HttpService) {}

    getNewsPostFromDatabase(): Observable<Array<NewsItem>> {
        return this.http.getData("https://localhost:5001/api/newsposts");
    }

}
