import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ns-events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.css']
})
export class EventsListComponent implements OnInit {
  sectionTitle = "Evenementen"
  constructor() { }

  ngOnInit(): void {
  }

}
