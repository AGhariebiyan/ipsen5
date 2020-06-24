import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { SearchComponent } from "./search/search.component";
import { UserSearchComponent } from "./user-search/user-search.component";
import { KbaseSearchComponent } from "./kbase-search/kbase-search.component";
import { EventSearchComponent } from "./event-search/event-search.component";
import { NewsSearchComponent } from "./news-search/news-search.component";

const routes: Routes = [
    { path: "", component: SearchComponent },
    { path: "user", component: UserSearchComponent },
    { path: "kbase", component: KbaseSearchComponent },
    { path: "event", component: EventSearchComponent },
    { path: "news", component: NewsSearchComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class SearchRoutingModule { }
