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

  getData<T>(endpoint: string): Observable<T> {
    return this.http.get<T>(this.apiLocation + endpoint);
  }

  getDataWithArgs<T>(endpoint: string, args: string): Observable<T> {
    return this.http.get<T>(this.apiLocation + endpoint + args);
  }

  postData(endpoint: string, body: any, headers: HttpHeaders) {
    return this.http.post(this.apiLocation + endpoint, body, {headers: headers}).pipe(
      catchError(this.handleError)
    );
  }

  putData(endpoint: string, body: any) {
    return this.http.put(this.apiLocation, body).pipe(
        catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof HttpErrorResponse) {
      console.log('An error occurred: ', error.error.message);
    } else {
      console.log(`API returned code :${error.status}`);
      console.log(`Body was: ${error.error}`);
    }

    dialogs.alert({
      title: "Let op!",
      message: "Er ging iets mis, probeer het later opnieuw of neem contact op met de systeembeheerder.",
      okButtonText: "sluit"
    });
    return throwError('Something bad happened; please try again later');

  }
}
