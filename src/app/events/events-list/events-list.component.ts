import { Component, OnInit } from '@angular/core';
import { Event } from '~/app/shared/models/event.model';
import { SegmentedBarItem } from 'tns-core-modules/ui'
import { EventService } from '~/app/services/event.service';
import { Observable } from 'rxjs';
@Component({
  selector: 'ns-events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.css']
})
export class EventsListComponent implements OnInit {
  sectionTitle = "Evenementen"
  events: Array<Event> = [];
  segmentedBarItems: Array<SegmentedBarItem> = [];
  events$: Observable<Event[]>

  constructor(private es: EventService) {
    const allEventsTab = new SegmentedBarItem()
    allEventsTab.title = "Alle Evenementen"
    const myEvents = new SegmentedBarItem()
    myEvents.title = "Voor Aangemeld"
    this.segmentedBarItems.push(allEventsTab)
    this.segmentedBarItems.push(myEvents)
  }

  ngOnInit(): void {
    console.log("Ahoy")
    this.events$ = this.es.getEvents();

    // this.es.getEventsRawResponse().subscribe(result => console.log(result))
    this.es.httpTest();
  }

  selectionChanged() {

  }

}
