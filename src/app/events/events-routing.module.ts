import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { EventsComponent } from "./events/events.component";
import { EventsListComponent } from "./events-list/events-list.component";
import { EventDetailComponent } from "~/app/events/event-detail/event-detail.component";

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
    }
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class EventsRoutingModule { }
