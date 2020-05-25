import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { map } from 'rxjs/operators';
import { EventResponse } from '../shared/models/event-response.model';
import { Event } from '../shared/models/event.model';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private endpoint = "/Events"

  constructor(private http: HttpService) { }

  getEvents(): Observable<EventResponse[]> {
    return this.http.getData<EventResponse[]>(this.endpoint);
  }
}
