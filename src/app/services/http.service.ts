import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private apiLocation = "https://localhost:5001/api"

  constructor(private http: HttpClient) { }

  getData<T>(endpoint: string): Observable<T> {
    return this.http.get<T>(this.apiLocation + endpoint);
  }

  getDataWithArgs<T>(endpoint: string, args: string): Observable<T> {
    return this.http.get<T>(endpoint + args);
  }

  postData(endpoint: string, body: HttpParams, headers: HttpHeaders) {
    return this.http.post(endpoint, body, {headers: headers}).pipe(
      catchError(this.handleError)
    );
  }

  test() {
    this.http.get("https://httpbin.org/get").subscribe(result => console.log(result))
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.log('An error occurred: ', error.error.message);
    } else {
      console.log(`API returned code :${error.status}`);
      console.log(`Body was: ${error.error}`);
    }

    return throwError('Something bad happened; please try again later');
  }
}
