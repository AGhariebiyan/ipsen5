import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { NewsComponent } from "./news/news.component";
import { NewsAddComponent } from "~/app/news/news-add/news-add.component";
import { NewsEditComponent } from "~/app/news/news-edit/news-edit.component";
import { NewsDetailComponent } from "~/app/news/news-detail/news-detail.component";

const routes: Routes = [
    { path: "", redirectTo: "news", pathMatch: "full" },
    { path: "news", component: NewsComponent },
    { path: "news-detail", component: NewsDetailComponent },
    { path: "news-add", component: NewsAddComponent },
    { path: "news-edit", component: NewsEditComponent },
    { path: "news-edit/:newsId", component: NewsEditComponent }

];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class NewsRoutingModule { }
