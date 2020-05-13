import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { EventsComponent } from './events/events.component';
import { EventsRoutingModule } from './events-routing.module';



@NgModule({
  declarations: [EventsComponent],
  imports: [
    NativeScriptCommonModule,
    EventsRoutingModule
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class EventsModule { }
