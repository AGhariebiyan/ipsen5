import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { KbaseComponent } from "./kbase/kbase.component";
import { NewsComponent } from "~/app/news/news/news.component";
import { KbaseAddComponent } from "~/app/kbase/kbase-add/kbase-add.component";
import { KbaseEditComponent } from "~/app/kbase/kbase-edit/kbase-edit.component";

const routes: Routes = [
    { path: "",
      redirectTo: "kbase",
      pathMatch: "full" },
    {
        path: "kbase",
        component: KbaseComponent
    },
    {
        path: "kbase-add",
        component: KbaseAddComponent
    },
    {
        path: "kbase-edit/:articleId",
        component: KbaseEditComponent
    }
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class KbaseRoutingModule { }
