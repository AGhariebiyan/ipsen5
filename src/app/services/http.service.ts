import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators'
import * as dialogs from "tns-core-modules/ui/dialogs";
import { environment } from "~/environments/environment.tns";

@Injectable({
  providedIn: "root"
})
export class HttpService {

  private apiLocation = environment.apiUrl + "/api";

  constructor(private http: HttpClient) { }

  jsonHeader = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  getData<T>(endpoint: string): Observable<T> {
    return this.http.get<T>(this.apiLocation + endpoint);
  }

  getDataWithArgs<T>(endpoint: string, args: string): Observable<T> {
    return this.http.get<T>(this.apiLocation + endpoint + args);
  }

  postData<T>(endpoint: string, body: any, headers: HttpHeaders): Observable<T> {
    return this.http.post<T>(this.apiLocation + endpoint, body, {headers: headers});
  }


  putData(endpoint: string, body: any, headers: HttpHeaders) {
    return this.http.put(this.apiLocation + endpoint, body, {headers: headers});
  }

  deleteData(endpoint: string) {
    return this.http.delete(this.apiLocation + endpoint);
  }
}
