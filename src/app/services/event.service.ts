import { EventEmitter, Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { EventResponse } from '../models/event-response.model';
import { Observable, Subject, forkJoin, BehaviorSubject } from 'rxjs';
import { ParticipantService } from './participant.service';
import { flatMap, mergeMap, map } from 'rxjs/operators';
import { HttpHeaders } from "@angular/common/http";
import { Event } from "~/app/models/event.model";
import { stringify } from "@angular/compiler/src/util";
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private endpoint = "/Events";
  public changedEvent = new EventEmitter<EventResponse>();

  events$ = new BehaviorSubject<EventResponse[]>(null)
  myEvents$ = new BehaviorSubject<EventResponse[]>(null)

  constructor(private http: HttpService, private participantService: ParticipantService, private accountService: AccountService) {}

  refreshAllEvents(): Promise<[void, void]> {
    return Promise.all([this.getEvents(), this.getUserEvents()])
  }

  getEvents(): Promise<void> {
    return new Promise<void>((accept, reject) => {
      this.getEventsInternal().subscribe(val => {
        this.events$.next(val)
        accept()
      }, () => reject())
    })
  }

  getUserEvents(): Promise<void> {
    return new Promise<void>((accept, reject) => {
      this.getEventsForCurrentUserInternal().subscribe(val => {
        this.myEvents$.next(val)
        accept()
      }, () => reject())
    })
  }

  private getEventsInternal(): Observable<EventResponse[]> {
    return this.http.getData<EventResponse[]>(this.endpoint)
  }

  getEvent(id: string): Promise<EventResponse> {
    return new Promise<EventResponse>( (accept, reject) => {
      this.http.getData<EventResponse>(this.endpoint + "/" + id).subscribe(result => {
          accept(result);
      }, error => {
          reject(error);
      });
    });
  }

  private getEventsForCurrentUserInternal(): Observable<EventResponse[]> {
    const participation$ = this.participantService.getAllParticipations();
    const allEvents$ = this.getEventsInternal();
    return forkJoin([participation$, allEvents$]).pipe(
      map(result => {
        // All Events
        let allEvents = result[1];

        // User ID to filter events with
        let id = this.accountService.account.id

        // Empty container to place events in
        let filteredEvents: EventResponse[] = [];
        let myParticipations = result[0].filter(val => val.accountId === id)

        // Running through all my participations
        myParticipations.map( result => {
          // Try to find a match for a participation's event Id in all events
          let match = allEvents.find(val => val.id === result.eventId)

          // If found, append to filtered events
          if (match) {
            filteredEvents.push(match)
          }
        });

        // Return result
        return filteredEvents
      })
    )
  }

  deleteEvent(id: string) {
    return new Promise<void>((accept, reject) => {
      this.http.deleteData(this.endpoint + "/" + id).subscribe(() => accept(), () => reject())
    })
  }

  updateEvent(event: Event): Promise<void> {
    return new Promise<void>((accept, reject) => {
        this.http.putData(this.endpoint + "/" + event.id, event, this.http.jsonHeader).subscribe( () => {
            let emitEvent = JSON.stringify(event);
            this.changedEvent.emit(JSON.parse(emitEvent));
            accept();
        }, () => {
          reject();
        });
    });
  }

  newEvent(eventJson: string) {
    return this.http.postData(this.endpoint, eventJson, this.http.jsonHeader)
  }


}
