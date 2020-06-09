import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { EventResponse } from '../shared/models/event-response.model';
import { Observable, Subject, forkJoin, BehaviorSubject } from 'rxjs';
import { ParticipantService } from './participant.service';
import { flatMap, mergeMap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private endpoint = "/Events"

  events$ = new BehaviorSubject<EventResponse[]>(null)

  constructor(private http: HttpService, private participantService: ParticipantService) {
    this.getEvents()
  }

  getEvents() {
    this.http.getData<EventResponse[]>(this.endpoint).subscribe(result => this.events$.next(result));
  }

  private getEventsInternal(): Observable<EventResponse[]> {
    return this.http.getData<EventResponse[]>(this.endpoint)
  }

  getEventsForUserId(id: string): Observable<EventResponse[]> {
    const participation$ = this.participantService.getAllParticipations();
    const allEvents$ = this.getEventsInternal()
    return forkJoin([participation$, allEvents$]).pipe(
      map(result => {

        // All Events
        let allEvents = result[1];

        //Empty container to place events in
        let filteredEvents: EventResponse[] = [];
        let myParticipations = result[0].filter(val => val.accountId === id)

        //Running through all my participations
        myParticipations.map( result => {
          //Try to find a match for a participation's event Id in all events
          let match = allEvents.find(val => val.id === result.eventId)

          //If found, append to filtered events
          if (match) {
            filteredEvents.push(match)
          }
        })

        //Return result
        return filteredEvents
      })
    )
  }

  deleteEvent(id: string) {
    return this.http.deleteData(this.endpoint + "/" + id)
  }

}
