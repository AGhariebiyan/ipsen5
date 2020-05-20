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

  getEvents(): Observable<Event[]> {
    let result = new Subject<Event[]>()
    this.http.getData<EventResponse[]>(this.endpoint).pipe(
      map(eventResponses => {
        console.log(eventResponses)
        let events: Event[] = [];
        eventResponses.forEach(response => {
          const event: Event = {
            eventDate: response.eventDate, 
            eventName: response.eventName,
            eventDescriptipn: response.eventDescription,
            locationName: response.eventLocationName,
            locationStreet: response.eventLocationStreet,
            locationPostalCode: response.eventLocationPostalCode,
            locationRegion: response.eventLocationRegion,
            locatonCountry: response.eventLocationCountry
          }
          events.push(event);
        })

        result.next(events)
      })
    );

    return result.asObservable();
  }

  getEventsRawResponse(): Observable<EventResponse[]> {
    return this.http.getData<EventResponse[]>(this.endpoint);
  }

  httpTest() {
    this.http.test()
  }
}
