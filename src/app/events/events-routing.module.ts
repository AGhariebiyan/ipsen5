import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { EventsComponent } from "./events/events.component";
import { EventsListComponent } from "./events-list/events-list.component";


const routes: Routes = [
    { path: "default", component: EventsComponent, children: [
        { path: "", component: EventsListComponent }
    ]}
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class EventsRoutingModule { }
