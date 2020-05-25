import { Injectable } from "@angular/core";
import { HttpService } from "~/app/services/http.service";
import { Observable } from "rxjs";
import { NewsItem } from "~/app/models/NewsItem.model";

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

    postItem(body: any) {
        this.http.makePostRequest(this.endpoint, body).subscribe();
        console.log(body);

    }

    // updateItem(id: number, body: any) {
    //     return this.http.putData(this.endpointItem, )
    //
    // }

}
