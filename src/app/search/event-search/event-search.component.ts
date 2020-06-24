import { Component, OnInit } from '@angular/core';
import { EventService } from '~/app/services/event.service';
import { RouterExtensions } from 'nativescript-angular';
import { Observable, BehaviorSubject } from 'rxjs';
import { EventResponse } from '~/app/models/event-response.model';
import { Navigation, NavigationExtras } from '@angular/router';
import { SearchBar } from 'tns-core-modules/ui';
import { map } from 'rxjs/operators';

@Component({
  selector: 'ns-event-search',
  templateUrl: './event-search.component.html',
  styleUrls: ['./event-search.component.css']
})
export class EventSearchComponent implements OnInit {

  events$: Observable<EventResponse[]>
  backup$: Observable<EventResponse[]>
  myEvents$: BehaviorSubject<EventResponse[]>
  constructor(private evService: EventService, private router: RouterExtensions) { }

  ngOnInit(): void {
    this.events$ = this.evService.getEventsInternal()
    this.backup$ = this.evService.getEventsInternal()

    this.myEvents$ = this.evService.myEvents$
    this.evService.getUserEvents()
  }

  textDidChange(args) {
    const searchBar = args.object as SearchBar
    this.events$ = this.applySearchQuery(searchBar.text)
  }

  applySearchQuery(query: string): Observable<EventResponse[]> {
    if (query === "") {
      return this.backup$;
    }
    return this.events$.pipe(
      map(events => events.filter(event => event.eventName.includes(query)))
    )
  }

  transformDateText(date: string): string {
    const dateSplitted = date.split("T")
    return dateSplitted[0]
  }

  eventTapped(selectedEvent: EventResponse) {
    this.myEvents$.subscribe(events => {
      if(events.length == 0) {
        this.navigate(selectedEvent, false);
        return;
      } else {
        for(let event of events) {
          if(selectedEvent.id == event.id) {
            this.navigate(selectedEvent, true);
            console.log("2")
            return;
          }
        }
        this.navigate(selectedEvent, false);
        console.log("3")
      }
    });
  }

  navigate(event, isRegistered) {
    let navigateExtras: NavigationExtras = {
      queryParams: {
        event: JSON.stringify(event),
        isRegistered: isRegistered
      }
    };
    this.router.navigate(['details'], navigateExtras);
  }


}
