import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NSEmptyOutletComponent } from "nativescript-angular";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import {StartPaginaComponent} from "~/app/StartPagina/start-pagina/start-pagina.component";
import {LoggedInComponent} from "~/app/logged-in/logged-in/logged-in.component";

const routes: Routes = [
    {
        path: "",
        redirectTo: "start",
        pathMatch: "full"
    },

    {
        path: "start",
        component: StartPaginaComponent,
        outlet: "startPagina"
    },

    {
        path: "loggedIn",
        component: LoggedInComponent,
        outlet: "loggedIn"
    },


];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
