import { Component, OnInit } from '@angular/core';
import { Event } from '~/app/shared/models/event.model';
import { SegmentedBarItem } from 'tns-core-modules/ui'
import { EventService } from '~/app/services/event.service';
import { Observable } from 'rxjs';
import { RouterExtensions } from '@nativescript/angular';
import { ActivatedRoute, NavigationExtras } from "@angular/router";
import { EventResponse } from '~/app/shared/models/event-response.model';
import { AccountService } from '~/app/services/account.service';
import { flatMap } from 'rxjs/operators';

@Component({
  selector: 'ns-events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.css']
})
export class EventsListComponent implements OnInit {
  sectionTitle = "Evenementen"
  events: Array<Event> = [];
  segmentedBarItems: Array<SegmentedBarItem> = [];
  events$: Observable<EventResponse[]>
  myEvents$: Observable<EventResponse[]>
  displayingallEvents: boolean = true;

  constructor(private es: EventService, private router: RouterExtensions, private activeRoute: ActivatedRoute, private accountsService: AccountService) {
    const allEventsTab = new SegmentedBarItem()
    allEventsTab.title = "Alle Evenementen"
    const myEvents = new SegmentedBarItem()
    myEvents.title = "Voor Aangemeld"
    this.segmentedBarItems.push(allEventsTab)
    this.segmentedBarItems.push(myEvents)
  }

  ngOnInit(): void {
    this.events$ = this.es.getEvents();
    this.myEvents$ = this.getMyEvents();
  }

  getMyEvents(): Observable<EventResponse[]> {
    return this.accountsService.account$.pipe(
      flatMap(account => this.es.getEventsForUserId(account.id))
    )
  }

  selectionChanged() {
    this.displayingallEvents = !this.displayingallEvents
  }

    /**
   * @author Valerie Timmerman
   *
   * @param event
   * When the user clicks on a event in the listview, this event is passed to this method and the user is navigated
   * towards the details page of that specific event. The event gets passed to this page in the queryparams as a JSON
   * object, passing the event as an object causes problems.
   */
  openDetails(event: EventResponse) {

      this.myEvents$.subscribe(events => {
        for(let event of events) {
          if(event.id == event.id) {
            this.navigate(event, true);
          } else {
            this.navigate(event, false);
          }
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
    this.router.navigate(['../details'], navigateExtras);
  }
}


