import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { EventsComponent } from './events/events.component';
import { EventsRoutingModule } from './events-routing.module';
import { SharedModule } from "../shared/shared.module";
import { EventDetailComponent } from './event-detail/event-detail.component';
import { NativeScriptRouterModule } from "nativescript-angular/router";

@NgModule({
  declarations: [
    EventsComponent,
    EventDetailComponent
  ],
  imports: [
    NativeScriptCommonModule,
    EventsRoutingModule,
    SharedModule,
    NativeScriptRouterModule
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class EventsModule { }
