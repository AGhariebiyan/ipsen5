import { Component, OnInit } from '@angular/core';
import { Event } from '~/app/shared/models/event.model';
import { SegmentedBarItem } from 'tns-core-modules/ui'
import { EventService } from '~/app/services/event.service';
import { Observable } from 'rxjs';
import { RouterExtensions } from '@nativescript/angular';
import { ActivatedRoute, NavigationExtras } from "@angular/router";
import { EventResponse } from '~/app/shared/models/event-response.model';
import { AccountService } from '~/app/services/account.service';
import { flatMap, map, filter } from 'rxjs/operators';

@Component({
  selector: 'ns-events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.css']
})
export class EventsListComponent implements OnInit {
  sectionTitle = "Evenementen"
  events: Array<Event> = [];
  segmentedBarItems: Array<SegmentedBarItem> = [];
  events$: Observable<EventResponse[]>;
  myEvents$: Observable<EventResponse[]>;
  displayingallEvents: boolean = false;
  months = ["Januari", "Februari", "Maart", "April", "Mei", "Juni", "Juli", "Augustus", "September", "Oktober", "November", "December"]

  constructor(private es: EventService, private router: RouterExtensions, private activeRoute: ActivatedRoute, private accountsService: AccountService) {
    const allEventsTab = new SegmentedBarItem();
    allEventsTab.title = "Alle Evenementen";
    const myEvents = new SegmentedBarItem();
    myEvents.title = "Voor Aangemeld";
    this.segmentedBarItems.push(allEventsTab);
    this.segmentedBarItems.push(myEvents);
  }

  ngOnInit(): void {
    this.es.changedEvent.subscribe(() => this.ngOnInit());
    this.events$ = this.es.getEvents();
    this.myEvents$ = this.getMyEvents();
  }

  getMyEvents(): Observable<EventResponse[]> {
    return this.es.getEventsForUserId(this.accountsService.account.id);
    // return this.accountsService.account$.pipe(
    //   flatMap(account => this.es.getEventsForUserId(account.id))
    // )
  }

  selectionChanged() {
    let eventsBackup$ = this.es.getEvents();

    this.displayingallEvents = !this.displayingallEvents;

    if (!this.displayingallEvents) {
      this.events$ = this.myEvents$;
    } else {
      this.events$ = eventsBackup$;
    }
  }

    /**
     * @author Valerie Timmerman
     *
     * When the user clicks on a event in the listview, this event is passed to this method and the user is navigated
     * towards the details page of that specific event. The event gets passed to this page in the queryparams as a JSON
     * object, passing the event as an object causes problems.
     * @param selectedEvent
     */
  openDetails(selectedEvent: EventResponse) {
      console.log("Tapped");
      this.myEvents$.subscribe(events => {
        if(events.length == 0) {
          this.navigate(selectedEvent, false);
        } else {
          for(let event of events) {
            if(selectedEvent.id == event.id) {
              this.navigate(selectedEvent, true);
              return;
            }
          }
          this.navigate(selectedEvent, false);
        }
      });
  }

  navigate(event, isRegistered) {
    let navigateExtras: NavigationExtras = {
      relativeTo: this.activeRoute,
      queryParams: {
        event: JSON.stringify(event),
        isRegistered: isRegistered
      }
    };
    this.router.navigate(['../details'], navigateExtras).then( () => {
      if(!this.displayingallEvents) {
        this.myEvents$ = this.getMyEvents();
        this.events$ = this.myEvents$;
      }
    });
  }

  getDateDay(dateString: string): number {
    const date = new Date(dateString);
    return date.getDate();
  }

  getDateMonth(dateString: string): string {
    const date = new Date(dateString);
    return this.months[date.getMonth()]
  }
}
