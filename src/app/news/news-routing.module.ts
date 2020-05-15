import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { NewsComponent } from "./news/news.component";
import { NewsAddComponent } from "~/app/news/news-add/news-add.component";
import { NewsEditComponent } from "~/app/news/news-edit/news-edit.component";

const routes: Routes = [
    { path: "default", component: NewsComponent },
    { path: "add", component: NewsAddComponent},
    { path: "news-edit", component: NewsEditComponent }
  
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class NewsRoutingModule { }
