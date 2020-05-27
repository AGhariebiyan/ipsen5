import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { KbaseComponent } from "./kbase/kbase.component";

const routes: Routes = [
    { path: "", component: KbaseComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class KbaseRoutingModule { }
