import { Component, OnInit } from '@angular/core';
import { Event } from '~/app/models/event.model';
import { SegmentedBarItem, Page } from 'tns-core-modules/ui'
import { EventService } from '~/app/services/event.service';
import { Observable, BehaviorSubject, forkJoin } from 'rxjs';
import { RouterExtensions } from '@nativescript/angular';
import { ActivatedRoute, NavigationExtras } from "@angular/router";
import { EventResponse } from '~/app/models/event-response.model';
import { AccountService } from '~/app/services/account.service';

@Component({
  selector: 'ns-events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.css']
})
export class EventsListComponent implements OnInit {
  sectionTitle = "Evenementen"
  segmentedBarItems: Array<SegmentedBarItem> = [];
  isPrivileged = this.accountsService.account.role.internalName == "admin" || this.accountsService.account.role.internalName == "board-member"
  events$: BehaviorSubject<EventResponse[]>
  myEvents$: BehaviorSubject<EventResponse[]>
  displayingallEvents: boolean = false;
  
  months = ["JAN", "FEB", "MAR", "APR", "MEI", "JUN", "JUL", "AUG", "SEP", "OKT", "NOV", "DEC"]

  constructor(
    private es: EventService, 
    private router: RouterExtensions, 
    private activeRoute: ActivatedRoute,
    private accountsService: AccountService
    ) 
    {
    const allEventsTab = new SegmentedBarItem()
    allEventsTab.title = "Alle Evenementen"
    const myEventsTab = new SegmentedBarItem()
    myEventsTab.title = "Voor Aangemeld"
    this.segmentedBarItems.push(allEventsTab)
    this.segmentedBarItems.push(myEventsTab)
  }

  ngOnInit(): void {
    this.events$ = this.es.events$;
    this.es.getEvents()

    this.myEvents$ = this.es.myEvents$
    this.es.getUserEvents()
  }
  
  /**
     * @author Waly Kerkeboom
     *
     * Changes the boolean value that determines
     * whether the all events or just the user's
     * events are being displayed on the page
     */
  selectionChanged() {
    this.displayingallEvents = !this.displayingallEvents;
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
    this.router.navigate(['../details'], navigateExtras);
  }

   /**
     * @author Waly Kerkeboom
     *
     * Takes a dateString and returns the day number (1-31)
     * @param dateString
     */
  getDateDay(dateString: string): number {
    const date = new Date(dateString);
    return date.getDate();
  }

  /**
     * @author Waly Kerkeboom
     *
     * Takes a dateString, converts it into a number (0-11) and uses subscripts to pull
     * month name out of the months array
     * @param dateString
     */
  getDateMonth(dateString: string): string {
    const date = new Date(dateString);
    return this.months[date.getMonth()]
  }

  addEventPressed() {
    this.router.navigate(['new']);
  }
}
