import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { EventsComponent } from "./events/events.component";
import { EventDetailComponent } from "~/app/events/event-detail/event-detail.component";


const routes: Routes = [
    { path: "default", component: EventsComponent },
    { path: "details", component: EventDetailComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class EventsRoutingModule { }
