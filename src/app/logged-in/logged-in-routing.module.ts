import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NSEmptyOutletComponent } from "nativescript-angular";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { LoggedInComponent } from "~/app/logged-in/logged-in/logged-in.component";

const routes: Routes = [
  {
    path: "default",
    component: LoggedInComponent,
    children: [
      {
        path: "news",
        component: NSEmptyOutletComponent,
        loadChildren: () => import("~/app/news/news.module").then((m) => m.NewsModule),
        outlet: "newsTab"
      },
      {
        path: "events",
        component: NSEmptyOutletComponent,
        loadChildren: () => import("~/app/events/events.module").then((m) => m.EventsModule),
        outlet: "eventsTab"
      },
      {
        path: "kbase",
        component: NSEmptyOutletComponent,
        loadChildren: () => import("~/app/kbase/kbase.module").then((m) => m.KbaseModule),
        outlet: "kbaseTab"
      },
      {
        path: "search",
        component: NSEmptyOutletComponent,
        loadChildren: () => import("~/app/search/search.module").then((m) => m.SearchModule),
        outlet: "searchTab"
      }
    ]
  }

];

@NgModule({
  imports: [
    NativeScriptRouterModule.forChild(routes),
    NativeScriptCommonModule
  ],
  exports: [NativeScriptRouterModule]
})
export class LoggedInRoutingModule { }
