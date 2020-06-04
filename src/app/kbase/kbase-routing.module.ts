import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { KbaseComponent } from "./kbase/kbase.component";
import { NewsComponent } from "~/app/news/news/news.component";
import { KbaseAddComponent } from "~/app/kbase/kbase-add/kbase-add.component";

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
    }
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class KbaseRoutingModule { }
