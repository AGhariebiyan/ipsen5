import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { EventsComponent } from "./events/events.component";
import { EventsRoutingModule } from "./events-routing.module";
import { SharedModule } from "../shared/shared.module";
import { EventsListComponent } from "./events-list/events-list.component";
import { EventDetailComponent } from "~/app/events/event-detail/event-detail.component";
import { CommonModule } from "@angular/common";
import { EventEditComponent } from './event-edit/event-edit.component';
import { NativeScriptUIDataFormModule } from "nativescript-ui-dataform/angular";
import { NewEventComponent } from './new-event/new-event.component';

@NgModule({
    declarations: [
        EventsComponent,
        EventsListComponent,
        EventDetailComponent,
        EventEditComponent,
        NewEventComponent
    ],
    imports: [
        NativeScriptCommonModule,
        EventsRoutingModule,
        SharedModule,
        CommonModule,
        NativeScriptUIDataFormModule
    ],
    schemas: [NO_ERRORS_SCHEMA]
})
export class EventsModule { }
