import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { EventsComponent } from './events/events.component';
import { EventsRoutingModule } from './events-routing.module';
import { SharedModule } from '../shared/shared.module';
import { EventsListComponent } from './events-list/events-list.component';

@NgModule({
  declarations: [
    EventsComponent,
    EventsListComponent
  ],
  imports: [
    NativeScriptCommonModule,
    EventsRoutingModule,
    SharedModule
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class EventsModule { }
