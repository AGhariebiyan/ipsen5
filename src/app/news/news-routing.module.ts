import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { NewsComponent } from "./news/news.component";
import { NewsAddComponent } from "~/app/news/news-add/news-add.component";
import { NewsEditComponent } from "~/app/news/news-edit/news-edit.component";
import { NewsDetailComponent } from "~/app/news/news-detail/news-detail.component";
import { RoleGuard } from "~/app/services/role.guard";

const routes: Routes = [
    { path: "", redirectTo: "news", pathMatch: "full" },
    { path: "news", component: NewsComponent },
    { path: "news-detail/:newsId", component: NewsDetailComponent },
    {
        path: "news-add",
        component: NewsAddComponent,
        canActivate: [RoleGuard],
        data: { roles: ["member", "admin", "board-member"] }
    },
    { path: "news-edit", component: NewsEditComponent },
    {
        path: "news-edit/:newsId",
        component: NewsEditComponent,
        data: { roles: ["member", "admin", "board-member"] }
    }

];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class NewsRoutingModule { }
