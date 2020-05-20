import { Component, OnInit } from '@angular/core';
import { Event } from '~/app/shared/models/event.model';
import { SegmentedBarItem } from 'tns-core-modules/ui'
import { RouterExtensions } from 'nativescript-angular';
import { error } from "@angular/compiler/src/util";
import { ActivatedRoute, NavigationExtras } from "@angular/router";
@Component({
  selector: 'ns-events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.css']
})
export class EventsListComponent implements OnInit {
  sectionTitle = "Evenementen"
  events: Array<Event> = [];
  segmentedBarItems: Array<SegmentedBarItem> = [];

  constructor(private routerExtensions: RouterExtensions, private activeRoute: ActivatedRoute) {
    const allEventsTab = new SegmentedBarItem()
    allEventsTab.title = "Alle Evenementen"
    const myEvents = new SegmentedBarItem()
    myEvents.title = "Voor Aangemeld"
    this.segmentedBarItems.push(allEventsTab)
    this.segmentedBarItems.push(myEvents)
  }

  ngOnInit(): void {
    const e1 = new Event("16", "Test", "Test")
    const e2 = new Event("20", "Test", "Test")
    const e3 = new Event("24", "Test", "Test")
    const e4 = new Event("23 Mei", "Lugus Investors Lunch", "Lunchen enzo");

    this.events.push(e1)
    this.events.push(e2)
    this.events.push(e3)
    this.events.push(e4);

  }

  /**
   * @author Valerie Timmerman
   *
   * @param event
   * When the user clicks on a event in the listview, this event is passed to this method and the user is navigated
   * towards the details page of that specific event. The event gets passed to this page in the queryparams as a JSON
   * object, passing the event as an object causes problems.
   */
  openDetails(event: Event) {
    let navigateExtras: NavigationExtras = {
      relativeTo: this.activeRoute,
      queryParams: {
        event: JSON.stringify(event)
      }
    };
    this.routerExtensions.navigate(['../details'], navigateExtras);
  }

}
