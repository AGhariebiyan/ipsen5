import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { NewsComponent } from "./news/news.component";
import { NewsAddComponent } from "~/app/news/news-add/news-add.component";
import { NewsEditComponent } from "~/app/news/news-edit/news-edit.component";
import { EventsListComponent } from "~/app/events/events-list/events-list.component";

// const routes: Routes = [
//     {
//         path: "default",
//         component: NewsComponent, children: [
//             {path: "news-edit/:itemID", component: NewsEditComponent}
//         ]
//     },
//     { path: "news-add", component: NewsAddComponent},
//     { path: "news-edit/:newsId", component: NewsEditComponent }
// ];

const routes: Routes = [
    { path: "",
      redirectTo: "news",
      pathMatch: "full" },
    {
        path: "news",
        component: NewsComponent
    },
    { path: "news-add", component: NewsAddComponent},
    { path: "news-edit", component: NewsEditComponent},
    { path: "news-edit/:newsId", component: NewsEditComponent }

];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class NewsRoutingModule { }
