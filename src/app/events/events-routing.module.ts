import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { EventsComponent } from "./events/events.component";
import { EventsListComponent } from "./events-list/events-list.component";
import { EventDetailComponent } from "~/app/events/event-detail/event-detail.component";
import { EventEditComponent } from "~/app/events/event-edit/event-edit.component";

// const routes: Routes = [
//     {
//         path: "",
//         component:
//         EventsComponent,
//         children: [
//             {
//                 path: "",
//                 component: EventsListComponent
//             },
//             {
//                 path: "details",
//                 component: EventDetailComponent
//             }
//     ]}
// ];

const routes: Routes = [
    {
        path: "",
        redirectTo: "events",
        pathMatch: "full"
    },
    {
        path: "events",
        component: EventsListComponent
    },
    {
        path: "details",
        component: EventDetailComponent
    },
    {
        path: "edit",
        component: EventEditComponent
    }
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class EventsRoutingModule { }
