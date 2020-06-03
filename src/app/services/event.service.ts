import { EventEmitter, Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { EventResponse } from '../shared/models/event-response.model';
import { Observable, Subject, forkJoin } from 'rxjs';
import { ParticipantService } from './participant.service';
import { flatMap, mergeMap, map } from 'rxjs/operators';
import { HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private endpoint = "/Events";
  public changedEvent = new EventEmitter<EventResponse>();

  constructor(private http: HttpService, private participantService: ParticipantService) { }

   getEvent(id: string): Promise<EventResponse> {
      return new Promise<EventResponse>( (accept, reject) => {
          this.http.getData<EventResponse>(this.endpoint + "/" + id).subscribe(result => {
              accept(result);
          }, error => {
              reject(error);
          });
      });
  }

  getEvents(): Observable<EventResponse[]> {
    return this.http.getData<EventResponse[]>(this.endpoint);
  }

  getEventsForUserId(id: string): Observable<EventResponse[]> {
    const participation$ = this.participantService.getAllParticipations();
    const events$ = this.getEvents();

    return forkJoin([participation$, events$]).pipe(
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
        });

        //Return result
        return filteredEvents
      })
    )
  }

    updateEvent(event: EventResponse): Promise<void> {
      return new Promise<void>((accept, reject) => {
          let httpHeaders = new HttpHeaders({
              'Content-Type': 'application/json'
          });
          this.http.putData(this.endpoint + "/" + event.id, event, httpHeaders).subscribe( () => {
              this.changedEvent.emit(event);
              accept();
          }, () => {
            reject();
          });
      });
    }
}
